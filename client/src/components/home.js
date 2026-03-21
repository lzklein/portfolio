import React from 'react'
import GameContainer from './td/GameContainer.js';

const Home = () => {

  return (
    <div>
      <div className="title-container">
        <h1>Louis  Klein</h1>
        <h3>Software Engineer</h3>
      </div>
      {/* td game */}
      {/* scavenger hunt towers */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <GameContainer />
      </div>    
    </div>
  )
}

export default Home