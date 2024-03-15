import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log('LOGGING IN ON AUTHCONTEXT')
            return { user: action.payload }
        case 'LOGOUT':
            console.log('LOGGING OUT ON AUTHCONTEXT')
            return { user: null }
        case 'FETCH_CONVOS':
            console.log('FETCHING CONVOS ON AUTHCONTEXT')
            return { renderList: [action.payload, ...state.renderList]}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        renderList: []
    })

    useEffect(() => { //Checks if cookie/user information stored in local storage when page is refreshed
        const user = JSON.parse(localStorage.getItem('user'))

        if(user) {
            console.log('REFRESHING ON AUTHOCONTEXT')
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
