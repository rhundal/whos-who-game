import React, { useState, useEffect } from "react";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [genre, setGenre] = useState(null);
  const [artist, setArtist] = useState(null);
  const [song, setSong] = useState(null);

  // const handleSubmit = (e) => {
  //   localStorage.setItem("genre", JSON.stringify(genre));
  //   localStorage.setItem("artist", JSON.stringify(artist));
  //   localStorage.setItem("song", JSON.stringify(song));
  // };

  const handleGenreSelect = (e) => {
    setGenre(e.target.value);
    console.log("genre: " + e.target.value);
  };

  const handleArtistSelect = (e) => {
    setArtist(e.target.value);
    console.log("artist: " + e.target.value);
  };

  const handleSongSelect = (e) => {
    setSong(e.target.value);
    console.log("song: " + e.target.value);
  };

  useEffect(() => {
    if (song === null) {
      const savedSongs = JSON.parse(localStorage.getItem("songsKey"));
      setSong(savedSongs != null ? savedSongs : 1);
    }
    localStorage.setItem("songsKey", JSON.stringify(song));
  }, [song]);

  useEffect(() => {
    if (artist === null) {
      const savedArtists = JSON.parse(localStorage.getItem("artistsKey"));
      setArtist(savedArtists != null ? savedArtists : 2);
    }
    localStorage.setItem("artistsKey", JSON.stringify(artist));
  }, [artist]);

  useEffect(() => {
    if (genre === null) {
      const savedGenre = JSON.parse(localStorage.getItem("genreKey"));
      setGenre(savedGenre != null ? savedGenre : "");
    }
    localStorage.setItem("genreKey", JSON.stringify(genre));
  }, [genre]);

  return (
    <div className="container-fluid mainContainer">
      <div className="row">
        <div className="col">
          <h1 className="header display-4"> Who's who </h1>
        </div>
      </div>
      <br />
      <br />

      <div className="jumbotron mt-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <form
                action="/game"
                className="form-inline"
                // onSubmit={handleSubmit}
              >
                <label className="my-1 mr-2" for="inlineFormCustomSelectPref">
                  {" "}
                  Genre{" "}
                </label>
                <select
                  className="custom-select my-1 mr-sm-2"
                  id="mySelect"
                  value={genre}
                  onChange={handleGenreSelect}
                  required
                >
                  <option selected>Choose...</option>
                  <option value="pop">pop</option>
                  <option value="hip-hop">hip-hop</option>
                  <option value="rock">rock</option>
                </select>

                <label className="my-1 mr-2" for="inlineFormCustomSelectPref">
                  {" "}
                  Number of Artists{" "}
                </label>
                <select
                  className="custom-select my-1 mr-sm-2"
                  id="mySelect"
                  value={artist}
                  onChange={handleArtistSelect}
                  required
                >
                  <option selected>Choose...</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>

                <label className="my-1 mr-2" for="inlineFormCustomSelectPref">
                  {" "}
                  Number of Songs{" "}
                </label>
                <select
                  className="custom-select my-1 mr-sm-2"
                  id="mySelect"
                  value={song}
                  onChange={handleSongSelect}
                  required
                >
                  <option selected>Choose...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

                <div class="custom-control custom-checkbox my-1 mr-sm-2 mt-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customControlInline"
                  />
                  <label
                    className="custom-control-label"
                    for="customControlInline"
                  >
                    Remember my preferences
                  </label>
                </div>

                <button
                  type="submit"
                  id="submit"
                  class="btn btn-info btn-style mt-2"
                  required
                >
                  Play
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
