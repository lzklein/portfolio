// imports
import './App.css';
import React, {createContext, useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Links from './components/Links';
import Projects from './components/Projects';
import Summary from './components/Summary';
import Resume from './components/Resume';

function App() {
  return (
    <div className="App">
      <Header/>
      Unga Bunga
      <Routes>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/about" element={<Summary/>}/>
        <Route path="/contact" element={<Links/>}/>
        <Route path="/resume" element={<Resume/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
    
  );
}

export default App;
