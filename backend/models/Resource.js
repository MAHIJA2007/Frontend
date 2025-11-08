const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['article', 'video', 'pdf', 'infographic', 'tool', 'calculator', 'guide']
  },
  category: {
    type: String,
    required: true,
    enum: ['renewable-energy', 'waste-reduction', 'water-conservation', 'eco-lifestyle', 'transportation', 'food-sustainability', 'general']
  },
  url: {
    type: String
  },
  fileUrl: {
    type: String
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/300x200'
  },
  content: {
    type: String
  },
  tags: [{
    type: String
  }],
  published: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  downloads: {
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

module.exports = mongoose.model('Resource', resourceSchema);
