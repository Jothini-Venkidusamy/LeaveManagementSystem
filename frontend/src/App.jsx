import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import HodDashboard from './pages/HodDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';

function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#e2e8f0',
            border: '1px solid #334155',
            borderRadius: '12px',
            fontFamily: 'Outfit, sans-serif',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={
          <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>
        } />
        <Route path="/teacher" element={
          <ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>
        } />
        <Route path="/hod" element={
          <ProtectedRoute role="hod"><HodDashboard /></ProtectedRoute>
        } />
        <Route path="/principal" element={
          <ProtectedRoute role="principal"><PrincipalDashboard /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
