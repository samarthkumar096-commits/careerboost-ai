const express = require('express');
const router = express.Router();

// Mock career tips
const careerTips = [
  {
    id: '1',
    title: 'Network Effectively',
    content: 'Building a strong professional network is crucial. Attend industry events, join online communities, and maintain relationships with colleagues and mentors.',
    category: 'networking'
  },
  {
    id: '2',
    title: 'Continuous Learning',
    content: 'Stay updated with industry trends. Dedicate time each week to learning new skills, reading industry blogs, and taking online courses.',
    category: 'learning'
  },
  {
    id: '3',
    title: 'Personal Branding',
    content: 'Build your online presence. Maintain an updated LinkedIn profile, contribute to open source, write technical blogs, and showcase your work.',
    category: 'branding'
  },
  {
    id: '4',
    title: 'Work-Life Balance',
    content: 'Maintain a healthy work-life balance. Set boundaries, take breaks, exercise regularly, and prioritize mental health.',
    category: 'wellness'
  },
  {
    id: '5',
    title: 'Goal Setting',
    content: 'Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound). Review and adjust them regularly to stay on track.',
    category: 'planning'
  },
  {
    id: '6',
    title: 'Communication Skills',
    content: 'Develop strong communication skills. Practice active listening, clear writing, and effective presentation skills.',
    category: 'skills'
  },
  {
    id: '7',
    title: 'Embrace Feedback',
    content: 'Seek and accept constructive feedback. Use it as an opportunity to grow and improve your performance.',
    category: 'growth'
  },
  {
    id: '8',
    title: 'Stay Organized',
    content: 'Use productivity tools and techniques. Prioritize tasks, manage time effectively, and maintain a clean workspace.',
    category: 'productivity'
  }
];

// Get career tips
router.get('/', (req, res) => {
  try {
    const { category } = req.query;
    
    let filteredTips = careerTips;
    
    if (category) {
      filteredTips = careerTips.filter(tip =>
        tip.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    res.json({
      success: true,
      tips: filteredTips,
      total: filteredTips.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching career tips',
      error: error.message
    });
  }
});

// Get tip by ID
router.get('/:id', (req, res) => {
  try {
    const tip = careerTips.find(t => t.id === req.params.id);
    
    if (!tip) {
      return res.status(404).json({
        success: false,
        message: 'Tip not found'
      });
    }
    
    res.json({
      success: true,
      tip
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tip',
      error: error.message
    });
  }
});

// Get tip categories
router.get('/categories/list', (req, res) => {
  const categories = [...new Set(careerTips.map(tip => tip.category))];
  
  res.json({
    success: true,
    categories
  });
});

module.exports = router;
