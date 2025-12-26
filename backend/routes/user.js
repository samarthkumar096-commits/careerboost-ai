const express = require('express');
const router = express.Router();

// Mock user data
let mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  location: 'Bangalore, India',
  skills: ['Android', 'Kotlin', 'Java', 'React Native'],
  experience: '5 years',
  education: 'B.Tech Computer Science',
  preferences: {
    job_type: 'Full-time',
    remote: true,
    salary_expectation: '₹15-25 LPA'
  }
};

// Get user profile
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    data: mockUser,
    message: 'Profile fetched successfully'
  });
});

// Update user profile
router.put('/profile', (req, res) => {
  try {
    const updates = req.body;
    
    // Update mock user
    mockUser = { ...mockUser, ...updates };
    
    res.json({
      success: true,
      data: true,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

// Get user stats
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      applications_sent: 15,
      interviews_scheduled: 5,
      offers_received: 2,
      profile_views: 120,
      skills_assessed: 8,
      courses_completed: 3
    }
  });
});

module.exports = router;
