import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import Game from './Game'

const App = () => (
  <div>
    <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/game' component={Game}/>
    </Switch>
  </div>
)

export default App
