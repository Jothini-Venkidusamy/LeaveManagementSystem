import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const roleColors = {
  student: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  teacher: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  hod: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  principal: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

const roleIcons = {
  student: '🎓',
  teacher: '📚',
  hod: '🏛️',
  principal: '👑',
};

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-display text-2xl font-semibold text-white hidden sm:block">LeaveMS</span>
          </div>

          {/* User Info */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-slate-400 text-lg">Welcome,</span>
                <span className="text-white font-medium text-lg">{user.name}</span>
              </div>
              <span className={`text-base font-semibold px-4 py-2 rounded-full border capitalize ${roleColors[user.role]}`}>
                {roleIcons[user.role]} {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-base font-medium px-4 py-2 rounded-lg hover:bg-red-500/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
