import React from 'react'

const Terms = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6, display: "flex",
        flexDirection: "column", alignItems: "center"
    }}>
      <h1>Terms of Service & Privacy Policy</h1>

      <section>
        <h2>Terms of Service</h2>
        <p>
          Welcome to NextFilm! By using this app, you agree to use it responsibly and respect the rights of others.
          NextFilm is a personal project built for practice and entertainment purposes. All data is provided via 
          The Movie Database (TMDB) API. NextFilm is not responsible for the content provided by TMDB.
        </p>
        <p>
          You may create an account, save movies, write reviews, and track your watchlist. Please do not misuse
          the app, attempt to harm the system, or post inappropriate content.
        </p>
      </section>

      <section>
        <h2>Privacy Policy</h2>
        <p>
          NextFilm values your privacy. We store only the data necessary for app functionality:
        </p>
        <ul>
          <li>Account email (if you sign up)</li>
          <li>Your saved watchlist and seen movies</li>
          <li>Your reviews and ratings</li>
        </ul>
        <p>
          We do not share your personal information with third parties. All data is stored securely in our database.
          If you wish to delete your account and personal data, please contact the developer or use the provided
          delete account option (if implemented).
        </p>
        <p>
          This app uses TMDB API data. All images, movie information, and related content are property of their
          respective owners.
        </p>
      </section>

      <section>
        <p style={{ fontStyle: "italic", marginTop: "2rem" }}>
          By using NextFilm, you agree to these terms and privacy practices. This is a personal, practice project and not a commercial service.
        </p>
      </section>
    </div>
  )
}

export default Terms
