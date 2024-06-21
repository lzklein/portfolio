import React from 'react'
import Links from './Links.js';

// maybe don't need / put this in home page
const Summary = () => {
  return (
    <div>
      {/* use intro transition with h1 fade to p? */}
      <h1>About Me</h1>
      <p>Blurb</p>
      <Links/>
    </div>
  )
}

export default Summary