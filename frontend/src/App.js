import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { About } from "./components/About";
import { Users } from "./components/Users";
import { Navbar } from "./components/Navbar";
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
