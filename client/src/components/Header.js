import React, {useState} from 'react'
import Navbar from './Navbar'

const Header = () => {
  const [hidden, setHidden] = useState(false)

  return (
    <div>      
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