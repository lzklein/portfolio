import React from 'react'

const Summary = () => {
  return (
    <div className="page">

      <h2>About Me</h2>

      <p>
        Blurb about myself. I'll write it eventually.
      </p>

      <h3>Technologies</h3>
      <ul>
        <li><strong>Languages:</strong> Java, JavaScript, Python, C++</li>
        <li><strong>Frontend:</strong> React, HTML5, CSS3, Bootstrap</li>
        <li><strong>Backend:</strong> Spring Boot, Express.js, Node.js, REST APIs</li>
        <li><strong>Databases:</strong> MySQL, SQLite, SQL Server, Azure SQL Database</li>
        <li><strong>Data Engineering:</strong> Azure Data Factory, Databricks, Azure Blob Storage, ETL Pipelines</li>
        <li><strong>Data Tools:</strong> Pandas, SQLAlchemy</li>
        <li><strong>Analytics:</strong> Power BI</li>
        <li><strong>Dev Tools:</strong> Docker, Git, npm, IntelliJ</li>
      </ul>

      <h3>Current/Planned projects</h3>
      <ul>
        <li>Manga translation tool (Python)</li>
        <li>Trello Rip Off (React-Spring Boot)</li>
      </ul>

    </div>
  )
}

export default Summary