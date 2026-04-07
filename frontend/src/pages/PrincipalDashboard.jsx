import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ApprovalCard from '../components/ApprovalCard';
import LeaveTable from '../components/LeaveTable';
import { getPendingLeaves, getAllLeaves } from '../services/api';

export default function PrincipalDashboard() {
  const [pending, setPending] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('pending');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pendingRes, allRes] = await Promise.all([getPendingLeaves(), getAllLeaves()]);
      setPending(pendingRes.data);
      setAll(allRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const approved = all.filter(l => l.status === 'approved').length;
  const rejected = all.filter(l => l.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-slate-800/60 border border-slate-700 rounded-xl flex items-center justify-center text-2xl">👑</div>
            <div>
              <h1 className="font-display text-5xl font-bold text-white">Principal Dashboard</h1>
              <p className="text-slate-400 text-lg">Welcome, {user.name}</p>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2">
            <span className="text-slate-300 text-sm font-medium">Final authority — HOD-approved requests awaiting your decision</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 bg-slate-700/20">
            <p className="text-slate-500 text-sm font-medium mb-1">Awaiting Decision</p>
            <p className="text-4xl font-bold text-yellow-300">{pending.length}</p>
          </div>
          <div className="glass-card p-4 bg-slate-700/20">
            <p className="text-slate-500 text-sm font-medium mb-1">Total Requests</p>
            <p className="text-4xl font-bold text-slate-200">{all.length}</p>
          </div>
          <div className="glass-card p-4 bg-slate-700/20">
            <p className="text-slate-500 text-sm font-medium mb-1">Final Approved</p>
            <p className="text-4xl font-bold text-emerald-300">{approved}</p>
          </div>
          <div className="glass-card p-4 bg-slate-700/20">
            <p className="text-slate-500 text-sm font-medium mb-1">Rejected</p>
            <p className="text-4xl font-bold text-red-300">{rejected}</p>
          </div>
        </div>

        <div className="flex gap-1 bg-slate-800/60 p-1 rounded-xl w-fit mb-6">
          <button
            onClick={() => setTab('pending')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              tab === 'pending' ? 'bg-slate-600 text-white shadow-lg shadow-slate-500/25' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Final Review
            {pending.length > 0 && (
              <span className="bg-yellow-500 text-yellow-900 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {pending.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab('all')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              tab === 'all' ? 'bg-slate-600 text-white shadow-lg shadow-slate-500/25' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Requests
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <button onClick={fetchData} className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <svg className="animate-spin w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : tab === 'pending' ? (
          <div className="space-y-4">
            {pending.length === 0 ? (
              <div className="glass-card p-12 text-center text-slate-500">
                <div className="text-4xl mb-3">👑</div>
                <p className="font-medium">No pending final approvals</p>
                <p className="text-sm mt-1">All requests have been resolved!</p>
              </div>
            ) : (
              pending.map(leave => (
                <ApprovalCard key={leave._id} leave={leave} onUpdate={fetchData} />
              ))
            )}
          </div>
        ) : (
          <div className="glass-card p-6">
            <LeaveTable leaves={all} showStudent={true} />
          </div>
        )}
      </div>
    </div>
  );
}
