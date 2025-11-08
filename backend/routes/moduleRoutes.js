const express = require('express');
const router = express.Router();
const {
  getAllModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
  completeModule
} = require('../controllers/moduleController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getAllModules);
router.get('/:id', getModule);
router.post('/', protect, admin, createModule);
router.put('/:id', protect, admin, updateModule);
router.delete('/:id', protect, admin, deleteModule);
router.post('/:id/complete', protect, completeModule);

module.exports = router;
