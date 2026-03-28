import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const navbar = () => {
  return (
      <nav className="navbar">
        <NavLink to="/" className='navlink'>Home</NavLink>
        <NavLink to="/about" className='navlink'>About</NavLink>
        <NavLink to="/projects" className='navlink'>Projects</NavLink>
        <NavLink to="/resume" className='navlink'>Resume</NavLink>
        <NavLink to="/contact" className='navlink'>Contact</NavLink>
      </nav>
  )
}

export default navbar