import { useRef } from "react";
import DiscordBot from '../images/Wangusbot.png';
import DiscordBot2 from '../images/Wangusbot-2.png';
import Smokeplus from '../images/Smokeplus.png';
import PlaylistCrusader from '../images/PlaylistCrusader.png';

const Projects = () => {
  const scrollerRef = useRef(null);
  const scrollTimeout = useRef();

  const handleScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    // 150ms after last input
    scrollTimeout.current = setTimeout(() => {
      centerNearestCard();
    }, 150);
  };

  const centerNearestCard = () => {
    const container = scrollerRef.current;
    const cards = container.querySelectorAll(".project-card");

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    if (closestCard) {
      const cardCenter = closestCard.offsetLeft + closestCard.offsetWidth / 2;
      const scrollTo = cardCenter - container.offsetWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="projects-page">
      <h1>Projects</h1>
      <div
        className="projects-carousel"
        ref={scrollerRef}
        onScroll={handleScroll}   // attach scroll listener
      >

        <div className="carousel-spacer" />

        <div className="project-card">
          <h2>Playlist Crusader</h2>
          <img src={PlaylistCrusader} style={{ maxWidth: "60%" }} />
          <h4>ReactJS - Java</h4>
          <p>Music Playlist Social Platform</p>
          <p>Fully customizable playlists with like functionality</p>
        </div>

        <div className="project-card">
          <h2>SmokePlus Online Storefront</h2>
          <a href="https://smokeplus.onrender.com/" target="_blank" rel="noreferrer">
            <img src={Smokeplus} style={{ width: "600px" }} />
          </a>
          <h4>ReactJS - ExpressJS</h4>
          <p>Set up pickup orders</p>
          <p>Manage inventory as an employee</p>
        </div>

        <div className="project-card">
          <h2>WangusBot</h2>
          <img src={DiscordBot} style={{maxWidth: "35%"}}/>
          <br />
          <img src={DiscordBot2} style={{ maxWidth: "35%" }} />
          <h4>DiscordJS</h4>
          <p>Discord Music Bot</p>
          <p>Downloads and plays audio via YouTube link</p>
        </div>

        <div className="carousel-spacer" />
      </div>
    </div>
  );
};

export default Projects;
