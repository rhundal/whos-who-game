import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'


import './GlobalStyles.css'

import Home from './pages/Home/Home'
import Game from './pages/Game/Game'
import Modal from './components/Modal/Modal'

function App() {
  const [modal, setModal] = useState(false)

  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/game' component={Game} />
      </Switch>
    </div>
  )
}

export default App
