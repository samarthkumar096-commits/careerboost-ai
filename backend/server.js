const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const jobsRoutes = require('./routes/jobs');
const resumeRoutes = require('./routes/resume');
const skillsRoutes = require('./routes/skills');
const coachRoutes = require('./routes/coach');
const learningRoutes = require('./routes/learning');
const tipsRoutes = require('./routes/tips');
const userRoutes = require('./routes/user');

// Routes
app.use('/api/jobs', jobsRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/coach', coachRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/tips', tipsRoutes);
app.use('/api/user', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'CareerBoost AI API is running!',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to CareerBoost AI API',
    version: '1.0.0',
    endpoints: {
      jobs: '/api/jobs',
      resume: '/api/resume',
      skills: '/api/skills',
      coach: '/api/coach',
      learning: '/api/learning',
      tips: '/api/tips',
      user: '/api/user'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CareerBoost AI API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 API docs: http://localhost:${PORT}/`);
});

module.exports = app;
