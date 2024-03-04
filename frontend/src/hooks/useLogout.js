import { use } from "../../../backend/routes/user"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {
        //remove from storage
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}