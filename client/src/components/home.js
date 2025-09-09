import React from 'react'
import Game from './td/Game.js';
// TODO
// !primary -- Content, basic appearances
// ?secondary -- 3d fx, animations, arcade, 


const Home = () => {

  return (
    <div>
      <h1>Louis Klein</h1>
      <h3>Software Engineer</h3>
      {/* td game */}
      {/* scavenger hunt towers */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Game />
      </div>    
    </div>
  )
}

export default Home