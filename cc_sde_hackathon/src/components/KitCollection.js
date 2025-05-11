import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import {
  Box,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material';
import axios from 'axios';

const KitCollection = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (data) => {
    if (data) {
      setScanning(false);
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/collect-kit', {
          unique_id: data,
        });
        setResult(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to process kit collection');
        setResult(null);
      }
      setLoading(false);
    }
  };

  const handleError = (err) => {
    setError('Error accessing camera: ' + err.message);
    setScanning(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Kit Collection
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {result && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {result.message}
            <br />
            Attendee: {result.attendee.name}
          </Alert>
        )}
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {scanning ? (
              <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
                <QrReader
                  constraints={{ facingMode: 'environment' }}
                  onResult={handleScan}
                  onError={handleError}
                  style={{ width: '100%' }}
                />
              </Box>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setScanning(true)}
                fullWidth
              >
                Start Scanning
              </Button>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default KitCollection; 