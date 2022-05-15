import PostMessage from '../models/postMessage.js'
import User from '../models/user.js'
//Les fonctions qu'on executera lorsqu'on accedera a un url dans le fichier ./routes/posts.js
export const getPost = async (req, res) => {
    try {
        const post = await PostMessage.findById(req.params.id);
        res.status(200).json(post);
      } catch (err) {
        res.status(500).json(err);
      }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post)
    try{
        const savedPost = await newPost.save();
        
        res.status(201).json(savedPost);

    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const allPosts = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await PostMessage.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  };

   export const feedPosts = async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await PostMessage.find({ userId: currentUser._id, sharer:"" });
      const userPosts1 = await PostMessage.find({sharer: currentUser._id});
      const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return PostMessage.find({ userId: friendId, sharer:{ $ne: currentUser._id} });
        })
      );
      const friendPosts1 = await Promise.all(
        currentUser.following.map((friendId) => {
          return PostMessage.find({ sharer: friendId });
        })
      );
      const posts = userPosts.concat(friendPosts.flat())
      const posts1= posts.concat(friendPosts1.flat())
      const posts2= posts1.concat(userPosts1)
      // const dates = []
      // const posts3= posts2.map((item) => {
      //   if(dates.includes(item.date)){
      //     return null
      //   }else{
      //     dates.push(item.date)
      //     return item
      //   }
      // });
      // console.log(posts3)
      // const posts4=posts3.filter(item=>item!==null)
      res.status(200).json(posts2);
    } catch (err) {
      res.status(500).json(err);
    }
  };
   export const profilePosts = async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await PostMessage.find({ userId: currentUser._id });
      const userSharedPosts = await PostMessage.find({ sharer: currentUser._id})
      const posts = userPosts.concat(userSharedPosts)
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  export const updatePost = async (req, res) => {
    try {
      const post = await PostMessage.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
   export const deletePost = async (req, res) => {
    try {
      const post = await PostMessage.findById(req.params.id);
      if (post.userId === req.body.userId) {
        console.log("after")
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };