from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import qrcode
import pandas as pd
from datetime import datetime
import json
from werkzeug.utils import secure_filename
import uuid

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['QR_FOLDER'] = 'qr_codes'

# Ensure upload directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['QR_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)

# Database Models
class Attendee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    unique_id = db.Column(db.String(36), unique=True, nullable=False)
    qr_code_path = db.Column(db.String(200))
    is_checked_in = db.Column(db.Boolean, default=False)
    has_collected_kit = db.Column(db.Boolean, default=False)
    check_in_time = db.Column(db.DateTime)
    kit_collection_time = db.Column(db.DateTime)
    feedback = db.Column(db.Text)

# Routes
@app.route('/api/upload-attendees', methods=['POST'])
def upload_attendees():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not file.filename.endswith('.csv'):
        return jsonify({'error': 'Please upload a CSV file'}), 400
    
    try:
        df = pd.read_csv(file)
        required_columns = ['name', 'email', 'phone']
        
        if not all(col in df.columns for col in required_columns):
            return jsonify({'error': 'CSV must contain name, email, and phone columns'}), 400
        
        for _, row in df.iterrows():
            unique_id = str(uuid.uuid4())
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr.add_data(unique_id)
            qr.make(fit=True)
            qr_img = qr.make_image(fill_color="black", back_color="white")
            
            qr_filename = f"{unique_id}.png"
            qr_path = os.path.join(app.config['QR_FOLDER'], qr_filename)
            qr_img.save(qr_path)
            
            attendee = Attendee(
                name=row['name'],
                email=row['email'],
                phone=row['phone'],
                unique_id=unique_id,
                qr_code_path=qr_path
            )
            db.session.add(attendee)
        
        db.session.commit()
        return jsonify({'message': 'Attendees uploaded successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/check-in', methods=['POST'])
def check_in():
    data = request.get_json()
    unique_id = data.get('unique_id')
    
    if not unique_id:
        return jsonify({'error': 'No unique ID provided'}), 400
    
    attendee = Attendee.query.filter_by(unique_id=unique_id).first()
    
    if not attendee:
        return jsonify({'error': 'Invalid unique ID'}), 404
    
    if attendee.is_checked_in:
        return jsonify({'error': 'Already checked in'}), 400
    
    attendee.is_checked_in = True
    attendee.check_in_time = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        'message': 'Check-in successful',
        'attendee': {
            'name': attendee.name,
            'email': attendee.email
        }
    }), 200

@app.route('/api/collect-kit', methods=['POST'])
def collect_kit():
    data = request.get_json()
    unique_id = data.get('unique_id')
    
    if not unique_id:
        return jsonify({'error': 'No unique ID provided'}), 400
    
    attendee = Attendee.query.filter_by(unique_id=unique_id).first()
    
    if not attendee:
        return jsonify({'error': 'Invalid unique ID'}), 404
    
    if not attendee.is_checked_in:
        return jsonify({'error': 'Must check in before collecting kit'}), 400
    
    if attendee.has_collected_kit:
        return jsonify({'error': 'Kit already collected'}), 400
    
    attendee.has_collected_kit = True
    attendee.kit_collection_time = datetime.utcnow()
    db.session.commit()
    
    return jsonify({
        'message': 'Kit collection successful',
        'attendee': {
            'name': attendee.name,
            'email': attendee.email
        }
    }), 200

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_stats():
    total_attendees = Attendee.query.count()
    checked_in = Attendee.query.filter_by(is_checked_in=True).count()
    kits_collected = Attendee.query.filter_by(has_collected_kit=True).count()
    
    return jsonify({
        'total_attendees': total_attendees,
        'checked_in': checked_in,
        'kits_collected': kits_collected,
        'check_in_rate': (checked_in / total_attendees * 100) if total_attendees > 0 else 0,
        'kit_collection_rate': (kits_collected / total_attendees * 100) if total_attendees > 0 else 0
    }), 200

@app.route('/api/attendees', methods=['GET'])
def get_attendees():
    attendees = Attendee.query.all()
    return jsonify([{
        'id': a.id,
        'name': a.name,
        'email': a.email,
        'phone': a.phone,
        'is_checked_in': a.is_checked_in,
        'has_collected_kit': a.has_collected_kit,
        'check_in_time': a.check_in_time.isoformat() if a.check_in_time else None,
        'kit_collection_time': a.kit_collection_time.isoformat() if a.kit_collection_time else None
    } for a in attendees]), 200

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    data = request.get_json()
    unique_id = data.get('unique_id')
    feedback_text = data.get('feedback')
    
    if not unique_id or not feedback_text:
        return jsonify({'error': 'Missing required fields'}), 400
    
    attendee = Attendee.query.filter_by(unique_id=unique_id).first()
    
    if not attendee:
        return jsonify({'error': 'Invalid unique ID'}), 404
    
    attendee.feedback = feedback_text
    db.session.commit()
    
    return jsonify({'message': 'Feedback submitted successfully'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True) 