import React from 'react'
import GameContainer from './td/GameContainer';
import { useIsMobile } from "../hooks/useIsMobile";
import Contact from './Contact';
import Summary from './Summary';
import Projects from './Projects';
import Resume from './Resume';

const Home = () => {
  const isMobile = useIsMobile();
  return (
    <div>
      <div className="title-container">
        <h1>Louis  Klein</h1>
        <h3>Software Engineer</h3>
      </div>
      {/* td game */}
      {isMobile?
        <>
          <Summary/>
          <Projects/>
          <Resume/>
          <Contact/>
        </>       
      :<div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <GameContainer />
      </div>    
      }
    </div>
  )
}

export default Home