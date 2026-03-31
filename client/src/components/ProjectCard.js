import React from 'react'

const ProjectCard = ({ title, image, tech, description, extra, link }) => {
  return (
    <div className="project-card">
      <h2>{title}</h2>

      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <img src={image} style={{ maxWidth: "90%" }} alt="project-screenshot"/>
        </a>
      ) : (
        <img src={image} style={{ maxWidth: "90%" }} alt="project-screenshot"/>
      )}

      <h4>{tech}</h4>
      <p>{description}</p>
      {extra && <p className="extra-text">{extra}</p>}
    </div>
  );
}

export default ProjectCard