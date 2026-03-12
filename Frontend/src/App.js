import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Coursedetails from './pages/Coursesdetails';
import Player from './pages/Player';
import Mycourses from './pages/Mycourses';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPortal from './pages/AdminPortal';


const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/coursesdetails/:id" element={<ProtectedRoute><Coursedetails /></ProtectedRoute>} />
          <Route path="/mycourses" element={<ProtectedRoute><Mycourses /></ProtectedRoute>} />
          <Route path="/player/:id/:lesson" element={<ProtectedRoute><Player /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
