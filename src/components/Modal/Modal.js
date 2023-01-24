import React from 'react'
import './Modal.css'

function Modal() {
  return (
    <div className='modal-container'>
      <div className='modal'>
        <h2>You have Won!</h2>
        <button onClick={() => setModal(false)}>Close</button>
      </div>
    </div>
  )
}

export default Modal