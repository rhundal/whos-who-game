import React, { useEffect, useState } from 'react'
import fetchFromSpotify, { request } from '../../services/api'
import loader from '../../assets/loading.svg'

const AUTH_ENDPOINT =
  'https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token'
const TOKEN_KEY = 'whos-who-access-token'
import './Home.css'

const Home = () => {
  const [genre, setGenre] = useState({ genre: 'pop' })
  const [artist, setArtist] = useState({ artist: 2 })
  const [song, setSong] = useState({ song: 1 })
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [configLoading, setConfigLoading] = useState(false)
  const [token, setToken] = useState('')

  const loadGenres = async (t) => {
    setConfigLoading(true)
    const response = await fetchFromSpotify({
      token: t,
      endpoint: 'recommendations/available-genre-seeds',
    })
    console.log(response)
    setGenres(response.genres)
    setConfigLoading(false)
  }

  useEffect(() => {
    setAuthLoading(true)
    const storedTokenString = localStorage.getItem(TOKEN_KEY)
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString)
      if (storedToken.expiration > Date.now()) {
        console.log('Token found in localstorage')
        setAuthLoading(false)
        setToken(storedToken.value)
        loadGenres(storedToken.value)
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
      loadGenres(newToken.value)
    })
  }, [])

  if (authLoading || configLoading) {
    return (
      <div className='loader'>
        <img src={loader} />
      </div>
    )
  }

  const handleSubmit = (e) => {
    localStorage.setItem('genre', JSON.stringify(genre))
    localStorage.setItem('artist', JSON.stringify(artist))
    localStorage.setItem('song', JSON.stringify(song))
  }

  const handleGenreSelect = (e) => {
    setGenre({ genre: e.target.value })
    setSelectedGenre(e.target.value)
    console.log('genre: ' + e.target.value)
  }

  const handleArtistSelect = (e) => {
    setArtist({ artist: parseInt(e.target.value) })
    console.log('artist: ' + e.target.value)
  }

  const handleSongSelect = (e) => {
    setSong({ song: parseInt(e.target.value) })
    console.log('song: ' + e.target.value)
  }

  return (
    <div className='home-container'>
      <form action='/game' onSubmit={handleSubmit}>
        <label for='inlineFormCustomSelectPref'> Genre </label>
        <select value={selectedGenre} onChange={handleGenreSelect}>
          <option value='' />
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <label for='inlineFormCustomSelectPref'> Number of Artists </label>
        <select
          defaultValue='2'
          onChange={handleArtistSelect}
          type='number'
          required
        >
          <option selected disabled>
            Choose
          </option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
        </select>
        <label for='inlineFormCustomSelectPref'> Number of Songs </label>
        <select
          defaultValue='1'
          onChange={handleSongSelect}
          type='number'
          required
        >
          <option selected disabled>
            Choose
          </option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        <div>
          <button className='play-btn' type='submit' id='submit' required>
            Play
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home
