const express = require('express');
const router = express.Router();
const {
  getAllResources,
  getResource,
  createResource,
  updateResource,
  deleteResource
} = require('../controllers/resourceController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getAllResources);
router.get('/:id', getResource);
router.post('/', protect, admin, createResource);
router.put('/:id', protect, admin, updateResource);
router.delete('/:id', protect, admin, deleteResource);

module.exports = router;
