import { createContext, useReducer } from "react"
import AuthReducer from "./authReducer"
//Creation d'un state global qu'on peut acceder n'importe ou dans notre projet.
const INITIAL_STATE = {
    user: localStorage.getItem('user')!=="null"? JSON.parse(localStorage.getItem('user')) : null,//utilisation de localStorage pour rester connecter meme apres racharger la page.
    isFetching: false,
    error: false,
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider value={{user: state.user, isFetching: state.isFetching, error: state.error, dispatch}}>
         {children}
        </AuthContext.Provider>
    )
} 