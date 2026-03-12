import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Coursedetails from './pages/Coursesdetails';
import Player from './pages/Player';
import Mycourses from './pages/Mycourses';
import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/coursesdetails/:id" element={<Coursedetails />} />
          <Route path="/mycourses" element={<Mycourses />} />
          <Route path="/player/:id/:lesson" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
