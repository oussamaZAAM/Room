import axios from "axios"

export const loginCall = async (userCred, dispatch) => {
    dispatch({ type: "LOGIN_START"});
    try{
        const res = await axios.post("http://localhost:5000/api/user/login", userCred); //Verifier si l'utilisateur existe et le connecter s'il existe.
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data});//Ca c'est pour changer le state global d'utilisateur.
        localStorage.setItem("user", JSON.stringify(res.data))//on va ajouter l'objet sous forme String car localStorage n'accepte que le type String.
        
    }catch(err){
        dispatch({ type: "LOGIN_FAILURE", payload: err});
    }
}

