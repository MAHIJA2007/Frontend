const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
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
    enum: ['renewable-energy', 'waste-reduction', 'water-conservation', 'eco-lifestyle', 'transportation', 'food-sustainability']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  content: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String
  },
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['pdf', 'video', 'article', 'infographic']
    }
  }],
  quiz: [{
    question: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: Number,
      required: true
    },
    explanation: String
  }],
  points: {
    type: Number,
    default: 10
  },
  carbonImpact: {
    type: Number, // kg CO2 saved when completed
    default: 0
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/400x300'
  },
  published: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('Module', moduleSchema);
