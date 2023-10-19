// imports
import './App.css';
import React, {createContext, useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Links from './components/Links';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Summary from './components/Summary';

function App() {
  return (
    <div className="App">
      <Header/>
      Unga Bunga
      <Footer/>
    </div>
    
  );
}

export default App;
