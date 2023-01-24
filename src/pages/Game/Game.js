import React, { useEffect, useState, useHistory } from 'react'
import fetchFromSpotify, { request } from '../../services/api'
import './Game.css'

import Player from '../../components/Player/Player'

import { Link } from 'react-router-dom'


const AUTH_ENDPOINT =
  'https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token'
const TOKEN_KEY = 'whos-who-access-token'

const Game = () => {
  const [artists, setArtists] = useState([])
  const [songs, setSongs] = useState([])
  const [token, setToken] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)
  const [genre] = useState(JSON.parse(localStorage.getItem('genre')))
  const [artistNum] = useState(JSON.parse(localStorage.getItem('artist')))
  const [songNum] = useState(JSON.parse(localStorage.getItem('song')))
  const num = songNum.song
  const imgNum = artistNum.artist

  // const [winStatus, setWinStatus] = useState("false");
  // const [numTries, setNumTries] = useState(0);
  // const [answer, setAnswer] = useState('');

  useEffect(() => {
    setAuthLoading(true)
    const storedTokenString = localStorage.getItem(TOKEN_KEY)
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString)
      if (storedToken.expiration > Date.now()) {
        console.log('Token found in localstorage')
        setAuthLoading(false)
        setToken(storedToken.value)
        loadData(storedToken.value)
        return
      }
    }
    console.log('Sending request to AWS endpoint')
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      }
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken))
      setAuthLoading(false)
      setToken(newToken.value)
      loadData(newToken.value)
    })
  }, [])

  const randomIndex = function () {
    return Math.floor(Math.random() * imgNum)
  }

  const random = randomIndex()

  let randomOffset = Math.floor(Math.random() * 100)

  const loadData = async (t) => {
    setConfigLoading(true)
    const response = await fetchFromSpotify({
      token: t,
      endpoint: `search?q=genre:${genre.genre}&type=artist&offset=${randomOffset}`,
    })

    let data = await response.artists.items[random].id

    setArtists(response.artists.items)

    const response2 = await fetchFromSpotify({
      token: t,
      endpoint: `artists/${data}/top-tracks?market=US`,
    })

    let data2 = await response2.tracks

    setSongs(data2.filter((song) => song.preview_url != null))
    setConfigLoading(false)
  }

  if (authLoading || configLoading) {
    return <div>Loading...</div>
  }

  // Check if artist name is the same as artist name in song data

  // function checkGuess() {
  //   if (artists[random].name === songs[random])
  // }

  console.log(artists[random])
  console.log(songs[random])

  // //feed answers

  // lose win logic

  // useEffect(() => {
  //   if (numTries > 0 && answerSelected !== "correct") {

  //     setLoseStatus(true);
  //   }
  //   else {
  //     setWinStatus(true);
  //   }


  // }, [])


  return (

    <>

      <div className='container mainContainer'>
        <div className='row'>
          <div className='col'>
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4"> Guess !!</h1>
                <div className='row'>
                  <div className='col xs-6 sm-4'>
                    <p className="lead">Play the song and guess the artist. </p>
                  </div>
                  <div className='col xs-6 sm-8'>
                    <button className="btn btn-info btn-style2 mt-2">
                      <Link to="/" style={{ textDecoration: 'none', color: 'white' }}> Home </Link>
                    </button>
                  </div>
                </div>
                <hr className="my-4" />
                <div className='row'>
                  {artists.length > imgNum
                    ? artists.slice(0, imgNum).map((artist) => (
                      <>
                        <div className='col' key={artist.id}>
                          <img src={artist.images[0].url} className="rounded-lg sizing" />
                          <p>{artist.name}</p>
                        </div>

                      </>
                    ))
                    : 'No Images to display'}
                </div>

                <div className='row'>

                  {songs.map((song) => {

                    <div className="form-check" key={song.id}>
                      <input type="radio" name={i} value={answer} onClick={() => checkAnswer(answer)} aria-label="Option 1" />
                    </div>
                  })}
                  <button type="submit" className="btn btn-primary mt-3">Submit Answer</button>

                </div>

              </div>
              <div className='row mt-4'>
                <ul className="list-unstyled">
                  <li className="media">
                    <div className="media-body">


                      <h5 className="col mt-0 mb-3 ml-4"> Play Tracks </h5>

                      <div className='col'>


                        {songs.length > 0 ? (
                          songs
                            .slice(0, num)
                            .map((song) => (
                              <ReactAudioPlayer
                                key={song.id}
                                src={song.preview_url}
                                autoPlay={false}
                                controls
                              />
                            ))
                        ) : (
                          <button onClick={() => window.location.reload()}>
                            No Songs for this Artist: Try again?
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>

  )
}

export default Game
