import React, { useState } from 'react'
import ReactHowler from 'react-howler'
import { Howl } from 'howler'
import { BsFillPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'
import { HiSpeakerWave } from 'react-icons/hi2'

import './Player.css'

function Player({ song }) {
  const [value, setValue] = useState(value)

  const sound = new Howl({
    src: [song.preview_url],
    html5: true,
    preload: true,
    volume: 0.5,
  })

  return (
    <div className='player-container'>
      <div className='play-pause-btn'>
        <button className='play' onClick={() => sound.play()}>
          <BsFillPlayCircleFill />
        </button>
        <button className='pause' onClick={() => sound.pause()}>
          <BsPauseCircleFill />
        </button>
      </div>
      <div className='volume-slider'>
        <i>
          <HiSpeakerWave />
        </i>
        <input
          type='range'
          min='0'
          max='1'
          value={value}
          step='0.01'
          onChange={(e) => sound.volume(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Player
