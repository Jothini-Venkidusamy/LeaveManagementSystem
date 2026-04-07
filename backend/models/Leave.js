const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leaveType: {
    type: String,
    enum: ['sick', 'casual', 'medical', 'personal', 'other'],
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'teacher_approved', 'hod_approved', 'approved', 'rejected'],
    default: 'pending'
  },
  currentLevel: {
    type: String,
    enum: ['teacher', 'hod', 'principal', 'completed'],
    default: 'teacher'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  remarks: {
    teacher: { type: String, default: '' },
    hod: { type: String, default: '' },
    principal: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
