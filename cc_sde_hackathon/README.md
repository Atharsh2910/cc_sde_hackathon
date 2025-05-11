# Event Management System

A comprehensive event management system that streamlines event flow using unique digital identifiers for attendees.

## Features

- CSV-based attendee onboarding
- QR code-based check-in system
- Kit distribution tracking
- Real-time dashboard with statistics
- Attendee search and filtering
- Feedback collection

## Prerequisites

- Python 3.7+
- Node.js 14+
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd event-management-system
```

2. Set up the backend:
```bash
# Create and activate virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Initialize the database
python app.py
```

3. Set up the frontend:
```bash
# Install Node.js dependencies
npm install

# Start the development server
npm start
```

4. Access the application:
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000

## Usage

1. **Upload Attendees**
   - Navigate to the Upload page
   - Select a CSV file with attendee details (name, email, phone)
   - The system will generate unique QR codes for each attendee

2. **Check-in Process**
   - Go to the Check-in page
   - Scan attendee QR codes using the camera
   - System will prevent double check-ins

3. **Kit Collection**
   - Visit the Kit Collection page
   - Scan attendee QR codes
   - System tracks kit distribution and prevents multiple collections

4. **Dashboard**
   - View real-time statistics
   - Monitor check-in and kit collection rates
   - Track overall event progress

5. **Attendee Management**
   - Search and filter attendee records
   - View check-in and kit collection status
   - Access detailed attendee information

## CSV Format

The system expects a CSV file with the following columns:
- name (required)
- email (required)
- phone (optional)

Example:
```csv
name,email,phone
John Doe,john@example.com,1234567890
Jane Smith,jane@example.com,9876543210
```

## Security

- All attendee data is stored securely in a SQLite database
- QR codes contain unique identifiers that are mapped to attendee records
- The system prevents unauthorized access and duplicate check-ins

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 