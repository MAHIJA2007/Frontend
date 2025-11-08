const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/modules', require('./routes/moduleRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: '🌱 Welcome to Sustainable Living Education Platform API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      modules: '/api/modules',
      projects: '/api/projects',
      resources: '/api/resources'
    }
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🌱 Sustainable Living Platform API Server          ║
  ║                                                       ║
  ║   🚀 Server running on port ${PORT}                     ║
  ║   🗄️  Database: MongoDB                               ║
  ║   🌍 Environment: ${process.env.NODE_ENV}                       ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
