import { ConvosContext } from '../context/ConvosContext'
import { useContext } from 'react'

export const useConvosContext = () => {
  const context = useContext(ConvosContext)

  if (!context) {
    throw Error('useConvosContext must be used inside a ConvosContextProvider')
  }

  return context
}