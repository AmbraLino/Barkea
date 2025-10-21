import './App.css';
import Navbar from './Base/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './MainPages/Home';
import About from './MainPages/About';
import Contact from './MainPages/Contact';

function App() {
  return (
    <div>
      <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
