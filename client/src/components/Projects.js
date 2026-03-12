import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import DiscordBot from '../assets/images/Wangusbot.png';
import Smokeplus from '../assets/images/Smokeplus.png';
import PlaylistCrusader from '../assets/images/PlaylistCrusader.png';
import Calculator from '../assets/images/Calculator.png'
import PokeTeamBuilder from '../assets/images/PokeTeamBuilder.png'

const Projects = () => {
  const scrollerRef = useRef(null);
  const scrollTimeout = useRef();

  const projects = [
    {
      title: "Playlist Crusader",
      image: PlaylistCrusader,
      tech: "ReactJS - Java",
      description: "Music Playlist Social Platform",
      extra: "Fully customizable playlists with like functionality",
    },
    {
      title: "SmokePlus Online Storefront",
      image: Smokeplus,
      tech: "ReactJS - ExpressJS",
      description: "Set up pickup orders",
      extra: "Manage inventory as an employee",
      link: "https://smokeplus.onrender.com/",
    },
    {
      title: "WangusBot",
      image: DiscordBot,
      tech: "DiscordJS",
      description: "Discord Music Bot",
      extra: "Downloads and plays audio via YouTube link",
    },
    {
      title: "BitCalculator",
      image: Calculator,
      tech: "C++",
      description : "Calculator app built in C++",
      extra: "GUI built using SFML library and self drawn assets",
    },
    {
      title: "Poké Team Builder",
      image: PokeTeamBuilder,
      tech: "ReactJS",
      description : "Pokémon team building tool",
      extra: "Powered by PokeAPI",
    },
  ];

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
      <h2>Projects</h2>
      <div
        className="projects-carousel"
        ref={scrollerRef}
        onScroll={handleScroll}   // attach scroll listener
      >

        <div className="carousel-spacer" />

        {projects.map((project, ind)=>{
          return <ProjectCard key={ind} {...project}/>
        })}

        <div className="carousel-spacer" />
      </div>
    </div>
  );
};

export default Projects;
