// App.js
import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';

import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProblemList from './pages/ProblemList';
import CreateProblemPage from './pages/CreateProblemPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import Landing from './pages/Landing';
import AnimatedPage from './components/AnimatePage';
import Landing2 from './pages/Landing2';

function App() {

  const authUser = useAuthStore((state) => state.authUser);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (

  <>
    <Toaster />
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={!authUser ? <Register /> : <Navigate to="/problems" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/problems" />} />
        <Route path="/" element={<AnimatedPage><Landing2 /></AnimatedPage>} />

        {/* Protected Routes */}
        <Route path="/" element={authUser ? <Layout /> : <Navigate to="/login" />}>
          <Route path="problems" element={<AnimatedPage><ProblemList /></AnimatedPage>} />
          <Route path="problem/:id" element={<AnimatedPage><ProblemDetailPage /></AnimatedPage>} />
          <Route path="createProblem" element={<AnimatedPage><CreateProblemPage /></AnimatedPage>} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  </>
  );
}

export default App;
