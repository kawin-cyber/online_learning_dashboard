import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import Lesson from './pages/Lesson.jsx';
import Assignments from './pages/Assignments.jsx';
import Calendar from './pages/Calendar.jsx';
import Resources from './pages/Resources.jsx';
import Community from './pages/Community.jsx';
import Quizzes from './pages/Quizzes.jsx';
import QuizAttempt from './pages/QuizAttempt.jsx';
import Analytics from './pages/Analytics.jsx';
import Progress from './pages/Progress.jsx';
import Notifications from './pages/Notifications.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import { useApp } from './context/AppContext.jsx';

function Protected({ children }) {
  const { user } = useApp();
  const loc = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  return children;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <Protected>
            <div className="app-shell">
              <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <div className="main-wrapper">
                <Navbar onMenu={() => setSidebarOpen(true)} />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:courseId" element={<CourseDetails />} />
                    <Route path="/lessons/:lessonId" element={<Lesson />} />
                    <Route path="/assignments" element={<Assignments />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/quizzes" element={<Quizzes />} />
                    <Route path="/quizzes/:quizId" element={<QuizAttempt />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route
                      path="*"
                      element={
                        <div className="vx-card" style={{ padding: 32, textAlign: 'center' }}>
                          <h2>Page not found</h2>
                          <p style={{ margin: '8px 0 16px', color: 'var(--text-muted)' }}>The requested page could not be located.</p>
                          <a href="/dashboard" className="vx-btn vx-btn-teal">
                            Go to Dashboard →
                          </a>
                        </div>
                      }
                    />
                  </Routes>
                </main>
              </div>
            </div>
          </Protected>
        }
      />
    </Routes>
  );
}
