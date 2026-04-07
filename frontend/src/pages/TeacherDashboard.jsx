import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ApprovalCard from '../components/ApprovalCard';
import LeaveForm from '../components/LeaveForm';
import LeaveTable from '../components/LeaveTable';
import { getPendingLeaves, getAllLeaves } from '../services/api';

export default function TeacherDashboard() {
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

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-slate-800/60 border border-slate-700 rounded-xl flex items-center justify-center text-2xl">📚</div>
            <div>
              <h1 className="font-display text-5xl font-bold text-white">Teacher Dashboard</h1>
              <p className="text-slate-400 text-lg">Welcome, {user.name}</p>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2">
            <span className="text-slate-300 text-sm font-medium">Review student requests & request leave to HOD</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 animate-slide-up">
          <div className="glass-card p-4 bg-slate-700/20">
            <p className="text-slate-500 text-sm font-medium mb-1">Awaiting Review</p>
            <p className="text-4xl font-bold text-yellow-300">{pending.length}</p>
          </div>
          <div className="glass-card p-4 bg-slate-700/20">
            <p className="text-slate-500 text-sm font-medium mb-1">Total Requests</p>
            <p className="text-4xl font-bold text-slate-200">{all.length}</p>
          </div>
          <div className="glass-card p-4 bg-slate-700/20">
            <p className="text-slate-500 text-sm font-medium mb-1">Processed</p>
            <p className="text-4xl font-bold text-emerald-300">{all.filter(l => l.status !== 'pending').length}</p>
          </div>
        </div>

        <div className="flex gap-1 bg-slate-800/60 p-1 rounded-xl w-fit mb-6">
          {[
            { key: 'pending', label: 'Pending Review' },
            { key: 'request', label: '+ Request Leave' },
            { key: 'all', label: 'All Requests' },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                tab === item.key ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
              {item.key === 'pending' && pending.length > 0 && (
                <span className="bg-yellow-500 text-yellow-900 text-xs font-bold px-1.5 py-0.5 rounded-full ml-2">
                  {pending.length}
                </span>
              )}
            </button>
          ))}
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
            <svg className="animate-spin w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : tab === 'pending' ? (
          <div className="space-y-4">
            {pending.length === 0 ? (
              <div className="glass-card p-12 text-center text-slate-500">
                <div className="text-4xl mb-3">✅</div>
                <p className="font-medium">No pending requests</p>
                <p className="text-sm mt-1">All caught up!</p>
              </div>
            ) : (
              pending.map(leave => (
                <ApprovalCard key={leave._id} leave={leave} onUpdate={fetchData} />
              ))
            )}
          </div>
        ) : tab === 'request' ? (
          <div className="glass-card p-6">
            <h2 className="text-white font-semibold text-lg mb-5">Request Leave to HOD</h2>
            <LeaveForm onSuccess={() => { fetchData(); setTab('all'); }} />
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
