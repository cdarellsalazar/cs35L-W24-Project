import { createContext, useReducer } from 'react'

export const ConvosContext = createContext()

export const convosReducer = (state, action) => {
  console.log('convo reducer is running. Type: ', action.type, ' payload: ', action.payload)
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
        workouts: state.convos.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ConvosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(convosReducer, {
    convos: null
  })

  return (
    <ConvosContext.Provider value={{...state, dispatch}}>
      { children }
    </ConvosContext.Provider>
  )
}