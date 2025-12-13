import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="Footer">
      <ul className="FooterLinks">
        <Link className="FooterLink" to="/about">
            <li>About</li>
        </Link>
        <Link className="FooterLink" to="/tmdb">
            <li>TMDB</li>
        </Link>
        <a className="FooterLink" href="https://github.com/bradapc/NextFilm">
            <li>GitHub</li>
        </a>
        <Link className="FooterLink" to="/terms">
            <li>Privacy/Terms</li>
        </Link>
      </ul>
    </div>
  )
}

export default Footer
