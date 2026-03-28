// imports
import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

// components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Summary from './components/Summary';
import Resume from './components/Resume';

function App() {
  return (
    <div className="App">
      <Analytics /> 
      <Header/>
      <Routes>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/about" element={<Summary/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/resume" element={<Resume/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
    
  );
}

export default App;
