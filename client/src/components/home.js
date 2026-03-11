import React from 'react'
import Game from './td/Game.js';
// TODO
// !primary -- Content, basic appearances

const Home = () => {

  return (
    <div>
      <h1 style={{marginTop:"35px", marginBottom:"5px"}}>Louis  Klein</h1>
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