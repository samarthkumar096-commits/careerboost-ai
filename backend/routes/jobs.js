const express = require('express');
const router = express.Router();

// Mock job data
const mockJobs = [
  {
    id: '1',
    title: 'Senior Android Developer',
    company: 'Tech Corp',
    location: 'Bangalore, India',
    salary: '₹15-25 LPA',
    description: 'Looking for experienced Android developer with Kotlin expertise',
    posted_date: '2024-12-20'
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '₹12-20 LPA',
    description: 'Join our fast-growing startup as a full stack developer',
    posted_date: '2024-12-22'
  },
  {
    id: '3',
    title: 'AI/ML Engineer',
    company: 'AI Solutions',
    location: 'Hyderabad, India',
    salary: '₹20-35 LPA',
    description: 'Work on cutting-edge AI/ML projects',
    posted_date: '2024-12-25'
  },
  {
    id: '4',
    title: 'React Native Developer',
    company: 'Mobile First Inc',
    location: 'Mumbai, India',
    salary: '₹10-18 LPA',
    description: 'Build amazing mobile apps with React Native',
    posted_date: '2024-12-23'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    location: 'Pune, India',
    salary: '₹15-28 LPA',
    description: 'Manage cloud infrastructure and CI/CD pipelines',
    posted_date: '2024-12-24'
  }
];

// Search jobs
router.get('/search', (req, res) => {
  try {
    const { query, location, page = 1 } = req.query;
    
    let filteredJobs = mockJobs;
    
    // Filter by query
    if (query) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by location
    if (location) {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    res.json({
      success: true,
      jobs: filteredJobs,
      total: filteredJobs.length,
      page: parseInt(page),
      message: `Found ${filteredJobs.length} jobs`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching jobs',
      error: error.message
    });
  }
});

// Get job by ID
router.get('/:id', (req, res) => {
  try {
    const job = mockJobs.find(j => j.id === req.params.id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error.message
    });
  }
});

// Get all jobs
router.get('/', (req, res) => {
  res.json({
    success: true,
    jobs: mockJobs,
    total: mockJobs.length
  });
});

module.exports = router;
