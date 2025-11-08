const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  category: {
    type: String,
    required: true,
    enum: ['recycling', 'upcycling', 'gardening', 'energy', 'water', 'composting', 'other']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  timeRequired: {
    type: Number, // in minutes
    required: true
  },
  materials: [{
    name: String,
    quantity: String,
    optional: {
      type: Boolean,
      default: false
    }
  }],
  steps: [{
    stepNumber: Number,
    instruction: String,
    image: String,
    tip: String
  }],
  images: [{
    type: String
  }],
  mainImage: {
    type: String,
    default: 'https://via.placeholder.com/400x300'
  },
  videoTutorial: {
    type: String
  },
  estimatedCost: {
    type: String
  },
  carbonImpact: {
    type: Number, // kg CO2 saved
    default: 0
  },
  points: {
    type: Number,
    default: 15
  },
  tags: [{
    type: String
  }],
  published: {
    type: Boolean,
    default: true
  },
  likes: {
    type: Number,
    default: 0
  },
  completions: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
