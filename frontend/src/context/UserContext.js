import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_CONVOS':
            return { renderConvos: [action.payload, ...state.renderList]}
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {
        renderList: []
    })

    useEffect(() => { //Checks if cookie/user information stored in local storage when page is refreshed
        const renderList = JSON.parse(localStorage.getItem('renderList'))
        if(renderList) {
            dispatch({ type: 'FETCH_CONVOS', payload: renderList })
        }
    }, [])

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}