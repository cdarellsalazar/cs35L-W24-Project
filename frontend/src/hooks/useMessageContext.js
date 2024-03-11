import { MessageContext } from '../context/MessageContext'
import { useContext } from 'react'

export const useMessageContext = () => {
  const context = useContext(MessageContext)

  if (!context) {
    throw Error('useConvosContext must be used inside a ConvosContextProvider')
  }

  return context
}