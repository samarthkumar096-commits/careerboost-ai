const express = require('express');
const router = express.Router();

// Mock skills list
const skillsList = [
  'JavaScript', 'Python', 'Java', 'Kotlin', 'Swift',
  'React', 'Angular', 'Vue.js', 'Node.js', 'Django',
  'Android', 'iOS', 'Flutter', 'React Native',
  'SQL', 'MongoDB', 'PostgreSQL', 'Redis',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
  'Machine Learning', 'AI', 'Data Science'
];

// Assess skill
router.post('/assess', (req, res) => {
  try {
    const { skill, level } = req.body;
    
    if (!skill) {
      return res.status(400).json({
        success: false,
        message: 'Skill is required'
      });
    }
    
    // Mock assessment
    const score = Math.floor(Math.random() * 40) + 60; // 60-100
    
    const recommendations = [
      `Practice ${skill} daily for 1 hour`,
      `Build 3 projects using ${skill}`,
      `Take advanced ${skill} course`,
      `Contribute to open source ${skill} projects`,
      `Read ${skill} documentation thoroughly`
    ];
    
    res.json({
      success: true,
      score,
      feedback: `Your ${skill} skills are ${score >= 80 ? 'excellent' : score >= 60 ? 'good' : 'needs improvement'}!`,
      recommendations: recommendations.slice(0, 3)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error assessing skill',
      error: error.message
    });
  }
});

// Get skills list
router.get('/list', (req, res) => {
  res.json({
    success: true,
    skills: skillsList,
    total: skillsList.length
  });
});

module.exports = router;
