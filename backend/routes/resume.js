const express = require('express');
const router = express.Router();

// Mock resume templates
const templates = [
  'Professional',
  'Modern',
  'Creative',
  'Minimalist',
  'Executive',
  'Technical'
];

// Create resume
router.post('/create', (req, res) => {
  try {
    const { name, email, phone, skills, experience } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }
    
    // Mock resume creation
    const resumeUrl = `https://careerboostai.com/resumes/${Date.now()}.pdf`;
    
    res.json({
      success: true,
      resume_url: resumeUrl,
      message: 'Resume created successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating resume',
      error: error.message
    });
  }
});

// Get resume templates
router.get('/templates', (req, res) => {
  res.json({
    success: true,
    templates,
    total: templates.length
  });
});

// Get resume by ID
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    resume: {
      id: req.params.id,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      skills: ['Android', 'Kotlin', 'Java', 'React Native'],
      experience: [
        {
          company: 'Tech Corp',
          position: 'Senior Developer',
          duration: '2020-2024',
          description: 'Led mobile development team'
        }
      ]
    }
  });
});

module.exports = router;
