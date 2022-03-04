const Blog = require('../models/blog')
const rootUser = {
  _id: "6222553d5b8775d7c7924daf",
  username: "root",
  name: "Root",
  passwordHash: "$2b$10$aMAs5r7tz2ynvjbyrAS/2O01eKA3roQRE5dEGmr4Vb6Staif0YQ8u"
}
const initialBlog = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user:"6222553d5b8775d7c7924daf"
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user:"6222553d5b8775d7c7924daf"
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user:"6222553d5b8775d7c7924daf"
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      user:"6222553d5b8775d7c7924daf"
    },
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user:"6222553d5b8775d7c7924daf"
    },
    {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      user:"6222553d5b8775d7c7924daf"
    }  
  ]

const nonExistingId = async () => {
    const blog = new Blog({title:"TBD",author:"NA",url:"https://fullstackopen.com/",likes:100})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    return (await Blog.find({})).map(blog => blog.toJSON())
}

module.exports = {
    initialBlog,
    nonExistingId,
    blogsInDb,
    rootUser
}