import React from 'react'

const ProjectCard = ({ title, image, tech, description, extra, link }) => {
  return (
    <div className="project-card">
      <h2>{title}</h2>

      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <img src={image} style={{ maxWidth: "90%" }} alt="project-image"/>
        </a>
      ) : (
        <img src={image} style={{ maxWidth: "90%" }} alt="project-image"/>
      )}

      <h4>{tech}</h4>
      <p>{description}</p>
      {extra && <p>{extra}</p>}
    </div>
  );
}

export default ProjectCard