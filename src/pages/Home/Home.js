import React, { useState } from 'react'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {

  const [genre, setGenre] = useState({ genre: "pop" });
  const [artist, setArtist] = useState({ artist: 2 });
  const [song, setSong] = useState({ song: 1 });

  const handleSubmit = (e) => {
    localStorage.setItem("genre", JSON.stringify(genre));
    localStorage.setItem("artist", JSON.stringify(artist));
    localStorage.setItem("song", JSON.stringify(song));
  };

  const handleGenreSelect = (e) => {
    setGenre({ genre: e.target.value })
    console.log("genre: " + e.target.value)
  };

  const handleArtistSelect = (e) => {
    setArtist({ artist: parseInt(e.target.value) })
    console.log("artist: " + e.target.value)
  };

  const handleSongSelect = (e) => {
    setSong({ song: parseInt(e.target.value) })
    console.log("song: " + e.target.value)
  };

  return (

    <div className='container-fluid mainContainer'>
      <div className='row'>
        <div className='col'>
          <h1 className='header display-4'> Who's who </h1>
        </div>
      </div>
      <br />
      <br />

      <div className='jumbotron mt-4'>

        <div className='container'>

          <div className='row'>
            <div className='col'>
              <form action="/game" className="form-inline" onSubmit={handleSubmit}>
                <label className="my-1 mr-2" for="inlineFormCustomSelectPref"> Genre </label>
                <select className="custom-select my-1 mr-sm-2" id="mySelect" defaultValue="pop" onChange={handleGenreSelect} required>
                  <option selected>Choose...</option>
                  <option value="pop">pop</option>
                  <option value="hip-hop">hip-hop</option>
                  <option value="rock">rock</option>
                </select>

                <label className="my-1 mr-2" for="inlineFormCustomSelectPref"> Number of Artists </label>
                <select className="custom-select my-1 mr-sm-2" id="mySelect" defaultValue="2" onChange={handleArtistSelect} required>
                  <option selected>Choose...</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>

                <label className="my-1 mr-2" for="inlineFormCustomSelectPref"> Number of Songs </label>
                <select className="custom-select my-1 mr-sm-2" id="mySelect" defaultValue="1" onChange={handleSongSelect} required>
                  <option selected>Choose...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

                <div class="custom-control custom-checkbox my-1 mr-sm-2 mt-3">
                  <input type="checkbox" className="custom-control-input" id="customControlInline" />
                  <label className="custom-control-label" for="customControlInline">Remember my preferences</label>
                </div>

                <button type="submit" id='submit' class="btn btn-info btn-style mt-2" required>Play</button>
              </form>
            </div>
          </div>
        </div>

      </div>

    </div>

  )
}

export default Home