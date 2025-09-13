const express = require('express');
const { createTask, getTasks, updateTaskStatus } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createTask).get(protect, getTasks);
router.route('/:id/status').put(protect, updateTaskStatus);

module.exports = router;