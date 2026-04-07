import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import LeaveForm from '../components/LeaveForm';
import LeaveTable from '../components/LeaveTable';
import { getMyLeaves } from '../services/api';

const statusCounts = (leaves) => ({
  total: leaves.length,
  pending: leaves.filter(l => l.status === 'pending').length,
  approved: leaves.filter(l => l.status === 'approved').length,
  rejected: leaves.filter(l => l.status === 'rejected').length,
});

export default function StudentDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('apply');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchLeaves = async () => {
    try {
      const { data } = await getMyLeaves();
      setLeaves(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeaves(); }, []);

  const counts = statusCounts(leaves);

  const stats = [
    { label: 'Total Applied', value: counts.total, color: 'text-slate-300', bg: 'bg-slate-700/40' },
    { label: 'Pending', value: counts.pending, color: 'text-yellow-300', bg: 'bg-yellow-500/10' },
    { label: 'Approved', value: counts.approved, color: 'text-emerald-300', bg: 'bg-emerald-500/10' },
    { label: 'Rejected', value: counts.rejected, color: 'text-red-300', bg: 'bg-red-500/10' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="font-display text-5xl font-bold text-white">
            Student Dashboard
          </h1>
          <p className="text-slate-400 mt-3 text-xl">Manage your leave applications, {user.name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 animate-slide-up">
          {stats.map(s => (
            <div key={s.label} className={`glass-card p-6 ${s.bg}`}>
              <p className="text-slate-500 text-base font-medium mb-2">{s.label}</p>
              <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-slate-800/60 p-2 rounded-xl w-fit mb-8">
          {[
            { key: 'apply', label: '+ Apply Leave' },
            { key: 'history', label: '📋 My Leaves' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 ${
                tab === t.key
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="glass-card p-6 animate-slide-up">
          {tab === 'apply' ? (
            <>
              <h2 className="text-white font-semibold text-lg mb-5">Apply for Leave</h2>
              <LeaveForm onSuccess={() => { fetchLeaves(); setTab('history'); }} />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold text-lg">Leave History</h2>
                <button onClick={fetchLeaves} className="text-slate-400 hover:text-slate-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              {loading ? (
                <div className="flex justify-center py-12">
                  <svg className="animate-spin w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              ) : (
                <LeaveTable leaves={leaves} />
              )}
            </>
          )}
        </div>

        {/* Status Legend */}
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {[
            { label: 'Pending', color: 'bg-yellow-400' },
            { label: 'Teacher Approved', color: 'bg-blue-400' },
            { label: 'HOD Approved', color: 'bg-purple-400' },
            { label: 'Approved', color: 'bg-emerald-400' },
            { label: 'Rejected', color: 'bg-red-400' },
          ].map(s => (
            <span key={s.label} className="flex items-center gap-1.5 text-slate-500 text-xs">
              <span className={`w-2 h-2 rounded-full ${s.color}`} />
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
