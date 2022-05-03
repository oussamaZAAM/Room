import User from '../models/user.js'
import bcrypt from "bcrypt"
export const register = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, salt);

     const newUser = new  User({
         username:user.username,
         email:user.email,
         desc:user.desc,
         password:hashedPassword,
         picture:user.picture,
         cover:user.cover,
     });  
    try{
        const cuser = await newUser.save();  
        console.log(user.picture);
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
        } else{   
        const validPassword = await bcrypt.compare(user.password, currentUser.password)
        if(!validPassword)
        { res.status(400).json("wrong password")}
        else{
        res.status(200).json(currentUser);
        }
      }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const allUsers = async (req, res) => {
    try {
      const allUsers = await User.find();
    //   const friendPosts = await Promise.all(
    //     currentUser.followings.map((friendId) => {
    //       return Post.find({ userId: friendId });
    //     })
    //   );
      res.status(200).json(allUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  };

   export const update = async (req, res) => {
     let samePassword = true;
     try{
      const currentUser = await User.findOne({_id: req.body._id} )    
      console.log(currentUser)
      samePassword = req.body.password === currentUser.password
      console.log(samePassword)
     }catch(error){        
       res.status(409).json({message: error.message})
    }
    console.log(req.body.password)
    let salt=''
    let user1={}
    let hashedPassword = req.body.password
    console.log(hashedPassword)
     if(!samePassword){
       salt = await bcrypt.genSalt(10);
       user1 = req.body;
       hashedPassword = await bcrypt.hash(user1.password, salt)
     }
     console.log(hashedPassword)
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: {...req.body, password:hashedPassword},
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } 
  ;
