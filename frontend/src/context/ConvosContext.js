import { createContext, useEffect, useReducer } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export const ConvosContext = createContext()

export const convosReducer = (state, action) => {
  //console.log('convo reducer is running. Type: ', action.type, ' payload: ', action.payload)
  switch (action.type) {
    case 'SET_CONVOS': 
      console.log('convos: ', action.payload)
      return {
        convos: action.payload
      }
    case 'CREATE_CONVO':
      return {
        convos: [action.payload, ...state.convos]
      }
    case 'DELETE_CONVO':
      return {
        convos: state.convos.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ConvosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(convosReducer, {
    convos: null
  })

useEffect(() => {
  const { user } = useAuthContext
  const fetchConvos = async () => {
    const response = await fetch('https://disruptchat-backend.onrender.com/api/convos/', {
      headers: {'Authorization': `Bearer ${user.token}`},
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'SET_CONVOS', payload: json})
    }
} } )

  return (
    <ConvosContext.Provider value={{...state, dispatch}}>
      { children }
    </ConvosContext.Provider>
  )
}