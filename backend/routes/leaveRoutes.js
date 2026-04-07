const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const { protect, authorize } = require('../middleware/authMiddleware');

const applicationLevel = { student: 'teacher', teacher: 'hod', hod: 'principal' };

// POST /api/leaves/apply — Student/Teacher/HOD applies
router.post('/apply', protect, authorize('student', 'teacher', 'hod'), async (req, res) => {
  const { leaveType, fromDate, toDate, reason } = req.body;
  try {
    const nextLevel = applicationLevel[req.user.role];
    if (!nextLevel) {
      return res.status(403).json({ message: 'Your role cannot apply for leave' });
    }

    const leave = await Leave.create({
      userId: req.user._id,
      leaveType,
      fromDate,
      toDate,
      reason,
      status: 'pending',
      currentLevel: nextLevel,
    });
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/leaves/my — Student views own leaves
router.get('/my', protect, authorize('student'), async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user._id }).sort({ appliedDate: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/leaves/pending — Role-based pending leaves
router.get('/pending', protect, authorize('teacher', 'hod', 'principal'), async (req, res) => {
  try {
    const levelMap = { teacher: 'teacher', hod: 'hod', principal: 'principal' };
    const level = levelMap[req.user.role];
    const leaves = await Leave.find({ currentLevel: level })
      .populate('userId', 'name email')
      .sort({ appliedDate: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/leaves/update/:id — Approve or reject
router.put('/update/:id', protect, authorize('teacher', 'hod', 'principal'), async (req, res) => {
  const { action, remark } = req.body; // action: 'approve' | 'reject'
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    const role = req.user.role;

    if (action === 'reject') {
      leave.status = 'rejected';
      leave.currentLevel = 'completed';
      if (remark) leave.remarks[role] = remark;
    } else if (action === 'approve') {
      if (role === 'teacher') {
        leave.status = 'teacher_approved';
        leave.currentLevel = 'hod';
        if (remark) leave.remarks.teacher = remark;
      } else if (role === 'hod') {
        leave.status = 'hod_approved';
        leave.currentLevel = 'principal';
        if (remark) leave.remarks.hod = remark;
      } else if (role === 'principal') {
        leave.status = 'approved';
        leave.currentLevel = 'completed';
        if (remark) leave.remarks.principal = remark;
      }
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }

    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/leaves/all — All leaves (for staff to see history)
router.get('/all', protect, authorize('teacher', 'hod', 'principal'), async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('userId', 'name email')
      .sort({ appliedDate: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
