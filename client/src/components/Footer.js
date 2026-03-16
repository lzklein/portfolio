import React from 'react'
import Favicons from './Favicons';

const Footer = () => {
  return (
    <div className='footer'>
      <Favicons/>
      <p className="footer-text">
        © {new Date().getFullYear()} Louis Klein · Built with React & Spring Boot
      </p>
    </div>
  )
}

export default Footer