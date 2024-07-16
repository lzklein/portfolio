import React, {useState} from 'react'
import Navbar from './Navbar'

const Header = () => {
  const [hidden, setHidden] = useState(false)

  return (
    <div className='header'>      
      {
        hidden?      
        null
        :
        <Navbar/>
      }
    </div>
  )
}

export default Header