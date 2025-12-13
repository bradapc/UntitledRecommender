import React from 'react'
import './css/About.css'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="AboutContainer">
      <h1>About</h1>
      <p>Welcome to NextFilm!<br /> <br />
This app is built for movie lovers who want an easy way to explore, track, and share their favorite films. As an avid movie watcher, I find that the more movies I see, the longer it takes to find the next one. Most modern movie websites focus on displaying large volumes of movies with little information about each. So my goal was to create a simple one-at-a-time discover page that displays information about each movie individually.<br /> <br />
Browse popular and top-rated movies, filter by your preferences, save movies to your watchlist or seen list, and add your own reviews and ratings. My personal watchlist helps me remember what I've seen so that I can give solid recommendations to others. <br /> <br />

NextFilm was created as a practice project using Postgres, React, Express, and Node.js. It’s a straightforward, user-friendly way to discover and manage movies. I hope the clear and easy to use interface helps you discover what to watch next!</p>
    <Link to="/discover"><button className="AboutButton">Start Browsing</button> </Link>
    </div>
  )
}

export default About
