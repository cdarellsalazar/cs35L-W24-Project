import { createContext, useReducer } from 'react'

export const MessageContext = createContext()

export const messageReducer = (state, action) => {
    console.log('message reducer is running. Type: ', action.type, ' payload: ', action.payload)
  switch (action.type) {
    case 'SET_MESSAGES': 
      console.log('messages: ', action.payload)
      return {
        messages: action.payload,
        reload: state.reload
      }
    case 'CREATE_MESSAGE':
      return {
        messages: [action.payload, ...state.messages],
        reload: state.reload
      }
    case 'DELETE_MESSAGE':
      return {
        messages: state.messages.filter((w) => w._id !== action.payload._id),
        reload: state.reload
      }
    case 'RELOAD':
      return{
        messages: state.messages,
        reload: !state.reload
      }
    default:
      return state
  }
}

export const MessageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, {
    messages: null,
    reload: false
  })

  return (
    <MessageContext.Provider value={{...state, dispatch}}>
      { children }
    </MessageContext.Provider>
  )
}