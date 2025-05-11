import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  CircularProgress,
  Chip,
} from '@mui/material';
import axios from 'axios';

const AttendeeList = () => {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/attendees');
        setAttendees(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch attendees');
        setLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  const filteredAttendees = attendees.filter(
    (attendee) =>
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attendee.phone?.includes(searchTerm)
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Attendee List
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Search Attendees"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Kit Collection</TableCell>
                <TableCell>Check-in Time</TableCell>
                <TableCell>Kit Collection Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAttendees.map((attendee) => (
                <TableRow key={attendee.id}>
                  <TableCell>{attendee.name}</TableCell>
                  <TableCell>{attendee.email}</TableCell>
                  <TableCell>{attendee.phone}</TableCell>
                  <TableCell>
                    <Chip
                      label={attendee.is_checked_in ? 'Checked In' : 'Not Checked In'}
                      color={attendee.is_checked_in ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={attendee.has_collected_kit ? 'Collected' : 'Not Collected'}
                      color={attendee.has_collected_kit ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    {attendee.check_in_time
                      ? new Date(attendee.check_in_time).toLocaleString()
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {attendee.kit_collection_time
                      ? new Date(attendee.kit_collection_time).toLocaleString()
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AttendeeList; 