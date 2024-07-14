import React from 'react'
import Technologies from './Technologies';

// maybe don't need / put this in home page
const Summary = () => {
  return (
    <div>
      {/* use intro transition with h1 fade to p? */}
      <h1>About Me</h1>
      {/* transitions while scrolling down, maybe changing bg images */}
      {/* font size change for focus? */}
      <p>Blurb</p>
      <Technologies/>
    </div>
  )
}

export default Summary