import React, { useState } from 'react'
import './Home.css'

const Home = () => {

  const [genre, setGenre] = useState({genre: "pop"});
  const [artist, setArtist] = useState({artist: 2});
  const [song, setSong] = useState({song: 1});

  const handleSubmit = (e) => {
   localStorage.setItem("genre", JSON.stringify(genre));
   localStorage.setItem("artist", JSON.stringify(artist));
   localStorage.setItem("song", JSON.stringify(song));
  };

  const handleGenreSelect = (e) => {
    setGenre({genre: e.target.value})
    console.log("genre: " + e.target.value)
  };

  const handleArtistSelect = (e) => {
    setArtist({artist: parseInt(e.target.value)})
    console.log("artist: " + e.target.value)
  };

  const handleSongSelect = (e) => {
    setSong({song: parseInt(e.target.value)})
    console.log("song: " + e.target.value)
  };

  return (
    <div id="main-container">
      <h1>Who's Who?</h1>
      <div className="menu-container">
        <form action="/game" onSubmit={handleSubmit}>
          <span>Genre: </span>
          <select id="mySelect" defaultValue="pop" onChange={handleGenreSelect} required>
            <option value="pop">pop</option>
            <option value="hip-hop">hip-hop</option>
            <option value="rock">rock</option>
          </select>
          <span>Number of songs: </span>
          <select id="mySelect" defaultValue="1" onChange={handleSongSelect} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <span>Number of artists: </span>
          <select id="mySelect" defaultValue="2" onChange={handleArtistSelect} required>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button type="submit" id="submit" required>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Home