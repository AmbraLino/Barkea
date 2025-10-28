import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import Navbar from "./Base/NavBar";
import Home from "./MainPages/Home";
import About from "./MainPages/About";
import Contact from "./MainPages/Contact";
import Footer from "./Base/Footer";
import 'leaflet/dist/leaflet.css';
import Login from  "./Auth/Login";
import Register from "./Auth/Register";
import Categories from "./MainPages/Categories";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/categories" element={<Categories/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
