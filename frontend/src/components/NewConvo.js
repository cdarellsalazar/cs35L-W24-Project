import {useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const NewConvo = () => {
    const [recipient, setRecipient] = useState('')
    const { user } = useAuthContext()
    const [error, setError] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const conversation = {recipient}

        const response = await fetch('http://localhost:4000/api/convos/newConvo', {
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
            setRecipient('')
            setError(null)
            console.log('New conversation added', json)
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Start Conversation</h3>

            <label>Recipient:</label>
            <input 
                type="text"
                onChange={(e) => setRecipient(e.target.value)}
                value = {recipient}
                />

        <button>Start Conversation</button>
        </form>
    )
}
export default NewConvo