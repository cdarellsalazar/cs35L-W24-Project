import { MessageContext } from '../context/MessageContext'
import { useContext } from 'react'

export const useMessageContext = () => {
  const context = useContext(MessageContext)

  if (!context) {
    throw Error('useMessageContext must be used inside a MesageContextProvider')
  }

  return context
}