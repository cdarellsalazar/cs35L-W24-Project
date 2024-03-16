import {useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useConvosContext } from "../hooks/useConvosContext"
import './NewConvo.css';

const NewConvo = () => {
    const [recipient, setRecipient] = useState('')
    const { user } = useAuthContext()
    const { dispatch } = useConvosContext()
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const conversation = {recipient}

        const response = await fetch('https://disruptchat-backend.onrender.com/api/convos/newConvo', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(conversation)
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok)
        {
            dispatch({type: 'CREATE_CONVO', payload: json});
            setRecipient('')
            setError(null)
            console.log('New conversation added', json)
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
          <label className="create-label">Recipient:</label>
          <input 
            className="create-input"
            type="text"
            onChange={(e) => setRecipient(e.target.value)}
            value = {recipient}
          />
      
          <button className="create-button">Start Conversation</button>
        </form>
      )
}
export default NewConvo