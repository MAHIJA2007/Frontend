const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  completeProject,
  likeProject
} = require('../controllers/projectController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/', protect, admin, createProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);
router.post('/:id/complete', protect, completeProject);
router.post('/:id/like', protect, likeProject);

module.exports = router;
