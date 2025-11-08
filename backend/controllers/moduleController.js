const Module = require('../models/Module');
const User = require('../models/User');

// @desc    Get all modules
// @route   GET /api/modules
// @access  Public
exports.getAllModules = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    
    let query = { published: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const modules = await Module.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: modules.length,
      data: modules
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single module
// @route   GET /api/modules/:id
// @access  Public
exports.getModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id)
      .populate('createdBy', 'name avatar');

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    res.status(200).json({
      success: true,
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new module
// @route   POST /api/modules
// @access  Private/Admin
exports.createModule = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const module = await Module.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Module created successfully',
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update module
// @route   PUT /api/modules/:id
// @access  Private/Admin
exports.updateModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Module updated successfully',
      data: module
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete module
// @route   DELETE /api/modules/:id
// @access  Private/Admin
exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findByIdAndDelete(req.params.id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Module deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Complete module
// @route   POST /api/modules/:id/complete
// @access  Private
exports.completeModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    const user = await User.findById(req.user.id);

    // Check if already completed
    if (user.progress.completedModules.includes(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Module already completed'
      });
    }

    // Add to completed modules
    user.progress.completedModules.push(req.params.id);
    user.progress.points += module.points;
    user.progress.carbonFootprintReduction += module.carbonImpact;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Module completed successfully!',
      data: {
        pointsEarned: module.points,
        carbonReduced: module.carbonImpact,
        totalPoints: user.progress.points
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
