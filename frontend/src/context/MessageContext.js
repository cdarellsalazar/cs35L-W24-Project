import { createContext, useReducer } from 'react'

export const MessageContext = createContext()

export const messageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESAGES': 
      return {
        convos: action.payload
      }
    case 'CREATE_MESSAGE':
      return {
        convos: [action.payload, ...state.convos]
      }
    case 'DELETE_MESSAGE':
      return {
        workouts: state.convos.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const MessageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, {
    messages: null
  })

  return (
    <MessageContext.Provider value={{...state, dispatch}}>
      { children }
    </MessageContext.Provider>
  )
}