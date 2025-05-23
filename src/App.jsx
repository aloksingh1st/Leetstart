import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';
import ProblemList from './pages/ProblemList';
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from 'lucide-react';
import CreateProblemPage from './pages/CreateProblemPage';
import ProblemDetailPage from './pages/ProblemDetailPage';

function App() {
  // ✅ Use selectors to avoid object identity issues
  const authUser = useAuthStore((state) => state.authUser);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth(); // ✅ This will now only run once
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <ProblemList /> : <Navigate to="/login" />}
          />
        </Route>

        <Route
          path="/signup"
          element={!authUser ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/problems"
          element={authUser ? <ProblemList /> : <Navigate to="/login" />}
        />

        <Route
          element={authUser ? <ProblemList /> : <Navigate to="/login" />}
        />


        <Route
          path="/problem/:id"
          element={authUser ? <ProblemDetailPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/createProblem"
          element={<CreateProblemPage />}
        />
      </Routes >
    </>
  );
}

export default App;
