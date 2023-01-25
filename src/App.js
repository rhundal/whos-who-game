import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import './GlobalStyles.css'

import Home from './pages/Home/Home'
import Game from './pages/Game/Game'
import Modal from './components/Modal/Modal'
import Header from './components/Header/Header'

function App() {
  const [modal, setModal] = useState(false)

  return (
    <div className='main-container'>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/game' component={Game} />
      </Switch>
    </div>
  )
}

export default App
