import React from 'react'

const TMDB = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h1>TMDB Attribution</h1>
      <p>This product uses the <strong>TMDB API</strong> but is not endorsed or certified by TMDB.</p>
      <p>
        Movie and TV data, images, and other content are provided by{" "}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          The Movie Database (TMDB)
        </a>.
      </p>
      <p>
        All rights to content, images, and logos belong to their respective owners.
      </p>
      <p>
        You can visit TMDB for more information or to contribute:{" "}
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          https://www.themoviedb.org/
        </a>
      </p>
      <div style={{ marginTop: "2rem" }}>
        <img 
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
          alt="TMDB Logo" 
          style={{ width: "150px" }} 
        />
        </div>
    </div>
  )
}

export default TMDB
