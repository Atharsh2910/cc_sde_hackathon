import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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

  const checkInData = {
    labels: ['Checked In', 'Not Checked In'],
    datasets: [
      {
        data: [stats.checked_in, stats.total_attendees - stats.checked_in],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  const kitCollectionData = {
    labels: ['Kits Collected', 'Kits Remaining'],
    datasets: [
      {
        data: [stats.kits_collected, stats.total_attendees - stats.kits_collected],
        backgroundColor: ['#2196f3', '#ff9800'],
      },
    ],
  };

  const timelineData = {
    labels: ['Total Attendees', 'Checked In', 'Kits Collected'],
    datasets: [
      {
        label: 'Event Progress',
        data: [stats.total_attendees, stats.checked_in, stats.kits_collected],
        backgroundColor: ['#1976d2', '#4caf50', '#2196f3'],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Event Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Check-in Status
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut data={checkInData} />
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Check-in Rate: {stats.check_in_rate.toFixed(1)}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Kit Collection Status
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut data={kitCollectionData} />
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Collection Rate: {stats.kit_collection_rate.toFixed(1)}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Event Progress
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={timelineData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 