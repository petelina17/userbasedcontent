import { createContext } from 'react'

const StateContext = createContext({
  userCreated: false,
  username: null
})

export default StateContext
