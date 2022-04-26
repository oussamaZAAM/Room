import axios from "axios"

export const loginCall = async (userCred, dispatch) => {
    dispatch({ type: "LOGIN_START"});
    try{
        const res = await axios.post("http://localhost:5000/api/user/login", userCred);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data});
        
    }catch(err){
        dispatch({ type: "LOGIN_FAILURE", payload: err});

    }
}

export const registerCall = async (userCred, dispatch) => {
    dispatch({ type: "REGISTER_START"});
    try{
        const res = await axios.post("http://localhost:5000/api/user/register", userCred);
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data});
        
    }catch(err){
        dispatch({ type: "REGISTER_FAILURE", payload: err});

    }
}

// export const postCall = async (username) =>{
//     try{
//         const res = await axios.get(`http://localhost:5000/api/${usename}/posts`)
//         console.log(res.data)
//         return res.data
//     } catch (err) {
//         console.log(err.message)
//     }
// }