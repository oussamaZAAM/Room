//Cette fonction donne la valeur de state global en se basant sur l'action prise, sinon par defaut il laisse le meme state 
const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN_START":
            return{
                user: null,
                isFetching: true,
                error: false,
            }
        case "LOGIN_SUCCESS":
            return{
                user: action.payload,
                isFetching: false,
                error: false,
            }
        case "LOGIN_FAILURE":
            return{
                user: null,
                isFetching: true,
                error: false,
            }
       
        default:
            return state
    }
}

export default AuthReducer;