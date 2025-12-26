const express = require('express');
const router = express.Router();

// Mock AI responses
const careerAdvice = {
  'career change': 'Changing careers requires careful planning. Start by identifying transferable skills, research your target industry, network with professionals, and consider additional training or certifications.',
  'salary negotiation': 'Research market rates, document your achievements, practice your pitch, and be confident but flexible. Always negotiate professionally and know your worth.',
  'interview tips': 'Prepare thoroughly, research the company, practice common questions, dress professionally, arrive early, and follow up with a thank-you note.',
  'resume': 'Keep it concise (1-2 pages), use action verbs, quantify achievements, tailor it to each job, and proofread carefully.',
  'default': 'I can help you with career planning, skill development, job search strategies, interview preparation, and professional growth. What specific area would you like guidance on?'
};

// Ask career coach
router.post('/ask', (req, res) => {
  try {
    const { question, context } = req.body;
    
    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Question is required'
      });
    }
    
    // Find relevant advice
    let answer = careerAdvice.default;
    for (const [key, value] of Object.entries(careerAdvice)) {
      if (question.toLowerCase().includes(key)) {
        answer = value;
        break;
      }
    }
    
    const suggestions = [
      'Set clear career goals',
      'Build a strong professional network',
      'Continuously learn new skills',
      'Seek mentorship opportunities',
      'Document your achievements'
    ];
    
    res.json({
      success: true,
      answer,
      suggestions: suggestions.slice(0, 3)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting coach response',
      error: error.message
    });
  }
});

// Get career suggestions
router.get('/suggestions', (req, res) => {
  const suggestions = [
    'Update your LinkedIn profile',
    'Learn a new programming language',
    'Attend industry conferences',
    'Build a portfolio website',
    'Get certified in your field',
    'Join professional communities',
    'Start a side project',
    'Read industry blogs and books'
  ];
  
  res.json({
    success: true,
    suggestions
  });
});

module.exports = router;
