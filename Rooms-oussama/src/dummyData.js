import image1 from "./images/post1.jpg"
import image2 from "./images/post2.jpg"
import image3 from "./images/post3.jpg"
import image4 from "./images/post4.jpg"
import user1 from "./images/profile.png"
import user2 from "./images/profile.png"
import user3 from "./images/profile.png"
import user4 from "./images/profile.png"
import user5 from "./images/profile.png"
// import user2 from "./images/user2.jpg"
// import user3 from "./images/user3.jpg"
// import user4 from "./images/user4.jpg"
// import user5 from "./images/user5.jpg"
import cover from "./images/profile.png"

export const Rooms =[
  {
    roomId: 1,
    roomTitle: "Anime",
    roomImg: image1,
    adminId:1,
    roomers:[
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 5,
      },
    ]
  },
  {
    roomId: 2,
    roomTitle: "Geography",
    roomImg: image2,
    adminId:3,
    roomers:[
      {
        id: 1,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
    ]
  },
]
export const Users =[
  {
    id: 1,
    profilePicture: user1,
    coverPicture: cover ,
    username: "Mohamed Amine",
    followers:[
      {
        id: 2
      },
      {
        id: 4
      },
    ],
    followings:[
      {
        id: 3,
      },
      {
        id: 2,
      },
    ]
  },
  {
    id: 2,
    profilePicture: user3,
    coverPicture: cover ,
    username: "Josh Bash",
    followers:[
      {
        id: 1
      },
      {
        id: 5
      },
    ],
    followings:[
      {
        id: 1,
      },
      {
        id: 3,
      },
    ]
  },
  {
    id: 3,
    profilePicture: user4,
    coverPicture: cover ,
    username: "Tachibana Hina",
    followers:[
      {
        id: 2
      },
      {
        id: 4
      },
    ],
    followings:[
      {
        id: 1,
      },
      {
        id: 5,
      },
    ]
  },
  {
    id: 4,
    profilePicture: user5,
    coverPicture: cover ,
    username: "Rafael Kroos",
    followers:[
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
    ],
    followings:[
      {
        id: 1,
      },
      {
        id: 5
      },
      {
        id: 3,
      },
    ]
  },
  {
    id: 5,
    profilePicture: user2,
    coverPicture: cover ,
    username: "Sarah Chris",
    followers:[
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
    ],
    followings:[
      {
        id: 1,
      },
      {
        id: 4
      },
      {
        id: 3,
      },
    ]
  },
]
export const Posts = [
    {
      id: 1,
      desc: "This anime hits",
      photo: image1,
      date: "3d ago",
      userId: 3,
      room:"Anime",
      roomers: 912,
      vote:601,
      comments:[
        {
          id: 1,
          userId: 5,
          content: "Indeed, the first episode only was enough to get it to high ranks",
          vote: 13,
          date: "16h ago"
        },
        {
          id: 2,
          userId: 2,
          content: "Indeed, the first episode only was enough to get it to high ranks",
          vote: 23,
          date: "2d ago"
        },
        {
          id: 3,
          userId: 3,
          content: "Thanks",
          vote: 8,
          date: "7h ago"
        },
      ]
    },
    {
        id: 2,
        desc: "Any good Sci-fi movie.",
        photo: image2,
        date: "29s ago",
        userId: 1,
        room:"Movies",
        roomers: 13,
        vote:7,
        comments:[],
      },
      {
        id: 3,
        desc: "First episode is good.",
        photo: image3,
        date: "17mins ago",
        userId: 1,
        room:"Anime",
        roomers: 32,
        vote:21,
        comments:[],
      },
      {
        id: 4,
        desc: "History of Japan.",
        photo: image4,
        date: "57mins ago",
        userId: 4,
        room:"History",
        roomers: 69,
        vote:-1,
        comments:[],
      },
] 