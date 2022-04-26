import User from '../models/user.js'
import bcrypt from "bcrypt"
export const register = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, salt);

     const newUser = new  User({
         username:user.username,
         email:user.email,
         password:hashedPassword,
     });  
    try{
        const cuser = await newUser.save();  
        
        res.status(201).json(cuser);
    } catch (error) {
         res.status(404).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const user = req.body;
    
    try{
        const currentUser = await User.findOne({email: user.email} )    
        if(!currentUser){
            res.status(404).json("user not found")
        }    
        const validPassword = await bcrypt.compare(user.password, currentUser.password)
        if(!validPassword)
        { res.status(400).json("wrong password")}

        res.status(200).json(currentUser);

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
