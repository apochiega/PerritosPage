import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home"
import Compartir from "./components/pages/Compartir";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";


function App() {
  

  return (
    <div>
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acta-uploader" element={<Compartir />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
