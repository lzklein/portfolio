import React from 'react'
import Navbar from './Navbar'
import { useIsMobile } from '../hooks/useIsMobile'

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <div className='header'>     
      {isMobile?null
      :<Navbar/>
      } 
    </div>
  )
}

export default Header