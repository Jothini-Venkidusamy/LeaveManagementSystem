import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateLeave } from '../services/api';
import StatusBadge from './StatusBadge';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
}

function countDays(from, to) {
  return Math.ceil((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24)) + 1;
}

export default function ApprovalCard({ leave, onUpdate }) {
  const [loading, setLoading] = useState(null);
  const [remark, setRemark] = useState('');

  const handleAction = async (action) => {
    setLoading(action);
    try {
      await updateLeave(leave._id, { action, remark });
      toast.success(`Leave ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      setRemark('');
      if (onUpdate) onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="glass-card p-6 hover:border-slate-600/60 transition-all duration-200 animate-slide-up">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-xl">{leave.userId?.name || 'Unknown'}</h3>
          <p className="text-slate-500 text-base mt-1">{leave.userId?.email}</p>
        </div>
        <StatusBadge status={leave.status} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-900/60 rounded-xl p-4">
          <p className="text-slate-500 text-sm mb-1">Type</p>
          <p className="text-slate-200 font-medium text-lg capitalize">{leave.leaveType}</p>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-4">
          <p className="text-slate-500 text-sm mb-1">Duration</p>
          <p className="text-slate-200 font-medium text-lg">{countDays(leave.fromDate, leave.toDate)} days</p>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-4">
          <p className="text-slate-500 text-sm mb-1">From</p>
          <p className="text-slate-200 font-medium text-lg">{formatDate(leave.fromDate)}</p>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-4">
          <p className="text-slate-500 text-sm mb-1">To</p>
          <p className="text-slate-200 font-medium text-lg">{formatDate(leave.toDate)}</p>
        </div>
      </div>

      <div className="bg-slate-900/60 rounded-xl p-4 mb-6">
        <p className="text-slate-500 text-sm mb-2">Reason</p>
        <p className="text-slate-300 text-lg">{leave.reason}</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Add a remark (optional)"
          className="input-field"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleAction('approve')}
          disabled={loading !== null}
          className="btn-success flex-1 flex items-center justify-center gap-3"
        >
          {loading === 'approve' ? (
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          Approve
        </button>
        <button
          onClick={() => handleAction('reject')}
          disabled={loading !== null}
          className="btn-danger flex-1 flex items-center justify-center gap-3"
        >
          {loading === 'reject' ? (
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          Reject
        </button>
      </div>
    </div>
  );
}
