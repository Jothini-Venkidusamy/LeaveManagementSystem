import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser } from '../services/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.role) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const { data } = await registerUser(form);
      localStorage.setItem('user', JSON.stringify(data));
      toast.success('Registration successful!');
      navigate(`/${data.role}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'student', label: '🎓 Student' },
    { value: 'teacher', label: '📚 Teacher' },
    { value: 'hod', label: '🏛️ HOD' },
    { value: 'principal', label: '👑 Principal' },
  ];

  return (
    <div className="page-bg grid-bg min-h-screen flex items-center justify-center px-4 py-10">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600/8 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-2xl animate-slide-up">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-3xl shadow-lg shadow-purple-500/30 mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400 text-xl">Join the leave management system</p>
        </div>

        <div className="glass-card p-10">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label">Role</label>
              <select name="role" value={form.role} onChange={handleChange} className="input-field">
                {roles.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 mt-3 text-lg">
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating Account...
                </>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-slate-400 text-lg mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center mt-6">
          <Link to="/" className="text-slate-500 hover:text-slate-400 text-base transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
