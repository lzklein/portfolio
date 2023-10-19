import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const navbar = () => {
  return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About Me</NavLink>
        <NavLink to="/resume" target="_blank" rel="noopener noreferrer">Resume</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
  )
}

export default navbar