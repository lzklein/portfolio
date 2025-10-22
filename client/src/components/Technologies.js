import React from 'react'
import JavaBadge from '../images/Java.jpg'

const Technologies = () => {
  return (
    <div>
    <h3>Technologies</h3>
    <ul>
      <li>
        React
      </li>
      <li>
        Express
      </li>
      <li>
        Python
      </li>
      <li>
        Go
      </li>
      <li>
        C#
      </li>
      <li>
        Java <img src={JavaBadge}/>
      </li>
    </ul>
    </div>
  )
}

export default Technologies