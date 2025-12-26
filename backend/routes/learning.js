const express = require('express');
const router = express.Router();

// Mock learning paths
const learningPaths = [
  {
    id: '1',
    title: 'Android Development Mastery',
    description: 'Complete path to become an expert Android developer',
    duration: '6 months',
    courses: [
      { id: 'c1', title: 'Kotlin Fundamentals', provider: 'Udemy', url: 'https://udemy.com' },
      { id: 'c2', title: 'Android Architecture', provider: 'Coursera', url: 'https://coursera.org' },
      { id: 'c3', title: 'Jetpack Compose', provider: 'Google', url: 'https://developer.android.com' }
    ]
  },
  {
    id: '2',
    title: 'Full Stack Web Development',
    description: 'Learn frontend and backend development',
    duration: '8 months',
    courses: [
      { id: 'c4', title: 'React.js Complete Guide', provider: 'Udemy', url: 'https://udemy.com' },
      { id: 'c5', title: 'Node.js Backend', provider: 'Pluralsight', url: 'https://pluralsight.com' },
      { id: 'c6', title: 'MongoDB Database', provider: 'MongoDB University', url: 'https://university.mongodb.com' }
    ]
  },
  {
    id: '3',
    title: 'AI & Machine Learning',
    description: 'Master artificial intelligence and ML',
    duration: '10 months',
    courses: [
      { id: 'c7', title: 'Python for AI', provider: 'Coursera', url: 'https://coursera.org' },
      { id: 'c8', title: 'Machine Learning A-Z', provider: 'Udemy', url: 'https://udemy.com' },
      { id: 'c9', title: 'Deep Learning', provider: 'deeplearning.ai', url: 'https://deeplearning.ai' }
    ]
  },
  {
    id: '4',
    title: 'DevOps Engineering',
    description: 'Learn cloud infrastructure and automation',
    duration: '5 months',
    courses: [
      { id: 'c10', title: 'Docker & Kubernetes', provider: 'Udemy', url: 'https://udemy.com' },
      { id: 'c11', title: 'AWS Solutions Architect', provider: 'AWS', url: 'https://aws.amazon.com' },
      { id: 'c12', title: 'CI/CD Pipelines', provider: 'LinkedIn Learning', url: 'https://linkedin.com/learning' }
    ]
  }
];

// Get learning paths
router.get('/paths', (req, res) => {
  try {
    const { category } = req.query;
    
    let filteredPaths = learningPaths;
    
    if (category) {
      filteredPaths = learningPaths.filter(path =>
        path.title.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    res.json({
      success: true,
      paths: filteredPaths,
      total: filteredPaths.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching learning paths',
      error: error.message
    });
  }
});

// Get learning path by ID
router.get('/path/:id', (req, res) => {
  try {
    const path = learningPaths.find(p => p.id === req.params.id);
    
    if (!path) {
      return res.status(404).json({
        success: false,
        message: 'Learning path not found'
      });
    }
    
    res.json({
      success: true,
      path
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching learning path',
      error: error.message
    });
  }
});

module.exports = router;
