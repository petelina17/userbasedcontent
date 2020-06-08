import React, { useState } from 'react'
import StateContext from './StateContext'

const GlobalState = (props) => {
  const [state, setState] = useState({
    userCreated: false,
    username: null
  })

  return (
    <StateContext.Provider value={{ state, setState }}>
      {props.children}
    </StateContext.Provider>
  )
}

export default GlobalState
