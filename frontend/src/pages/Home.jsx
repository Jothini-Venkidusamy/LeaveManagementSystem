import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) navigate(`/${user.role}`);
  }, []);

  const features = [
    { icon: '🎓', title: 'Students', desc: 'Apply and track leave requests in real-time' },
    { icon: '📚', title: 'Teachers', desc: 'Review and action student leave requests' },
    { icon: '🏛️', title: 'HOD', desc: 'Second-level approval and monitoring' },
    { icon: '👑', title: 'Principal', desc: 'Final authority on all leave decisions' },
  ];

  return (
    <div className="page-bg grid-bg min-h-screen flex flex-col">
      {/* Glow effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-600/10 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Badge */}
        <div className="animate-fade-in mb-8">
          <span className="inline-flex items-center gap-3 bg-primary-500/10 border border-primary-500/20 text-primary-400 text-lg font-semibold px-6 py-3 rounded-full">
            <span className="w-3 h-3 bg-primary-400 rounded-full animate-pulse" />
            Academic Leave Management System
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Leave
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400"> Management</span>
            <br />System
          </h1>
          <p className="text-slate-400 text-2xl max-w-2xl mx-auto leading-relaxed">
            A streamlined, hierarchical leave approval workflow for educational institutions.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mb-20 animate-slide-up justify-center">
          <button
            onClick={() => navigate('/login', { state: { type: 'student' } })}
            className="btn-primary flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🎓</span>
            Student Login
          </button>
          <button
            onClick={() => navigate('/login', { state: { type: 'staff' } })}
            className="btn-secondary flex items-center justify-center gap-3"
          >
            <span className="text-2xl">💼</span>
            Staff Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="border-2 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 text-lg"
          >
            Register
          </button>
        </div>

        {/* Workflow */}
        <div className="w-full max-w-4xl mb-16 animate-fade-in">
          <p className="text-center text-slate-500 text-lg font-semibold uppercase tracking-widest mb-6">Approval Workflow</p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            {['Student', 'Teacher', 'HOD', 'Principal', '✅ Approved'].map((step, i) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <div className={`px-4 py-2 rounded-lg text-lg sm:text-xl font-semibold ${
                  i === 4
                    ? 'bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500/30'
                    : 'bg-slate-800 text-slate-300 border-2 border-slate-700'
                }`}>
                  {step}
                </div>
                {i < 4 && <span className="text-slate-600 text-2xl">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-4xl animate-slide-up">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6 text-center hover:border-slate-600 transition-all duration-200 hover:-translate-y-1">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-xl mb-3">{f.title}</h3>
              <p className="text-slate-500 text-base leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-slate-600 text-xs">
        Leave Management System &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}
