import { useState } from 'react';
import toast from 'react-hot-toast';
import { applyLeave } from '../services/api';

export default function LeaveForm({ onSuccess }) {
  const [form, setForm] = useState({
    leaveType: 'sick',
    fromDate: '',
    toDate: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fromDate || !form.toDate || !form.reason.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    if (new Date(form.toDate) < new Date(form.fromDate)) {
      toast.error('End date cannot be before start date');
      return;
    }
    setLoading(true);
    try {
      await applyLeave(form);
      toast.success('Leave application submitted!');
      setForm({ leaveType: 'sick', fromDate: '', toDate: '', reason: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to apply leave');
    } finally {
      setLoading(false);
    }
  };

  const leaveTypes = [
    { value: 'sick', label: '🤒 Sick Leave' },
    { value: 'casual', label: '☀️ Casual Leave' },
    { value: 'medical', label: '🏥 Medical Leave' },
    { value: 'personal', label: '👤 Personal Leave' },
    { value: 'other', label: '📋 Other' },
  ];

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const nextApproverLabel = {
    student: 'Teacher',
    teacher: 'HOD',
    hod: 'Principal',
  }[user.role] || 'Next Level';

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label">Leave Type</label>
          <select
            name="leaveType"
            value={form.leaveType}
            onChange={handleChange}
            className="input-field"
          >
            {leaveTypes.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-1" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label">From Date</label>
          <input
            type="date"
            name="fromDate"
            value={form.fromDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="label">To Date</label>
          <input
            type="date"
            name="toDate"
            value={form.toDate}
            onChange={handleChange}
            min={form.fromDate || new Date().toISOString().split('T')[0]}
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label className="label">Reason</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the reason for leave..."
          className="input-field resize-none text-base"
          required
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-3">
        {loading ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Request Leave to {nextApproverLabel}
          </>
        )}
      </button>
    </form>
  );
}
