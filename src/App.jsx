import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'

function App() {
  const [count, setCount] = useState(0)

  const authUser = false;

  return (
    <>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
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


      </Routes>

    </>
  )
}

export default App
