import { useState } from "react"
import { dispatch } from '../context/UserContext'

export const useFetchConvos = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const fetchConvos = async (userID) => {
        setLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/fetchConvos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        } 
        if (response.ok) {
            localStorage.setItem('renderConvos', JSON.stringify(json))

            dispatch({type: 'FETCH_CONVOS', payload: json})

            setIsLoading(false)
        }
    }

    return {fetchConvos, error, isLoading}

} 