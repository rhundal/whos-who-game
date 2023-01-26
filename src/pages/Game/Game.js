import React, { useEffect, useState, useHistory } from "react";
import fetchFromSpotify, { request } from "../../services/api";
import loader from "../../assets/loading.svg";
import "./Game.css";

import Player from "../../components/Player/Player";

import { Link } from "react-router-dom";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";

const TOKEN_KEY = "whos-who-access-token";

const Game = () => {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [token, setToken] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(false);
  const [genre] = useState(JSON.parse(localStorage.getItem("genre"))); // these
  const [artistNum] = useState(JSON.parse(localStorage.getItem("artist")));
  const [songNum] = useState(JSON.parse(localStorage.getItem("song")));
  const num = songNum.song;
  const imgNum = artistNum.artist;
  const [winningArtist, setWinningArtist] = useState([]);

  // newly added - win lose logic
  const [winStatus, setWinStatus] = useState(false);
  const [numTries, setNumTries] = useState(0);
  const [answer, setAnswer] = useState("");
  // const [loseStatus, setLoseStatus] = useState(false)
  const [valueRadio, setValue] = useState([1, 2, 3, 4]);
  const [correct, setCorrect] = useState(null);
  let [isChecked, setChecked] = useState(null);

  useEffect(() => {
    setAuthLoading(true);
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        setAuthLoading(false);
        setToken(storedToken.value);
        loadData(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      setAuthLoading(false);
      setToken(newToken.value);
      loadData(newToken.value);
    });
  }, []);

  const randomIndex = function () {
    return Math.floor(Math.random() * imgNum);
  };

  const random = randomIndex();

  let randomOffset = Math.floor(Math.random() * 100);

  const loadData = async (t) => {
    setConfigLoading(true);
    const response = await fetchFromSpotify({
      token: t,
      endpoint: `search?q=genre:${genre.genre}&type=artist&offset=${randomOffset}`,
    });

    let data = await response.artists.items[random].id;

    setArtists(response.artists.items);

    const response2 = await fetchFromSpotify({
      token: t,
      endpoint: `artists/${data}/top-tracks?market=US`,
    });

    let data2 = await response2.tracks;
    setWinningArtist(data);

    setSongs(data2.filter((song) => song.preview_url != null));
    setConfigLoading(false);
  };

  if (authLoading || configLoading) {
    return (
      <div className="loader">
        <img src={loader} />
      </div>
    );

  }

  return (
    <div className="game-container">
      <button className="home-btn">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          {" "}
          Home{" "}
        </Link>
      </button>
      <h3>Play the song and guess the artist.</h3>
      <hr className="line" />
      <div className="img-container">
        {artists.length > imgNum
          ? artists.slice(0, imgNum).map((artist) => (
            <div className="image" key={artist.id}>
              <img src={artist.images[0].url} />
              <p>{artist.name}</p>
            </div>
          ))
          : "No Images to display"}
      </div>
      {/* radio buttons */}
      <div className='radioStyles'>
        {
          artists.length > imgNum
            ? artists.slice(0, imgNum).map((artist) => (
              <div className="radioStyles" key={artist.name}>
                <input type="radio" key={artist.name} id={artist.name} checked={isChecked === artist.name} name={artist.name} value={artist.name} onChange={() => {

                  setChecked(artist.name);

                  if (winningArtist === artist.id) {
                    console.log("you won");
                  }
                  else {
                    console.log("you lost");
                  }
                }
                } />
                <label for={artist.name}></label>
              </div>
              // {artist.name}
            ))
            : "No selections to display"
        }
      </div>
      <div className="songStyles">
        {/* media players */}
        {songs.length > 0 ? (
          songs.slice(0, num).map((song) => <Player song={song} key={song.id} />)
        ) : (
          <button onClick={() => window.location.reload()}>
            No Songs for this Artist: Try again?
          </button>
        )}
      </div>
    </div>
  );
};
export default Game;