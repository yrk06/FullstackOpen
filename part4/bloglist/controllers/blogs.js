const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { VerifyToken } = require('../utils/middlewares')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.use(VerifyToken)
blogsRouter.post('/', async (request, response) => {

    const blogData = {...request.body}
    const user = request.user
    if(!blogData.user) {
        blogData.user = user.id
    }
    const blog = new Blog(blogData)
    const result = await blog.save()
    user.blogs = user.blogs.concat(blog.id)
    await user.save()
    response.status(201).json(await result.populate('user'))
})

blogsRouter.delete('/:id', async (request,response) => {
    const blog = await Blog.findById(request.params.id)
    if(!blog){
        return response.status(404).json({error: "Invalid resource ID"})
    }
    if(blog.user.toString() === request.userId.toString()){
        await blog.remove()
        return response.status(204).end()
    }
    response.status(401).json({error: "Unauthorized access to resource"})
})

blogsRouter.put('/:id', async (request,response) => {

    const res = await Blog.findByIdAndUpdate(request.params.id,request.body,{ new: true, runValidators: true, context:'query' })
    return res ? response.status(200).json(res) : response.status(404).json({error:"Resource does not exist"})
    
})

module.exports = blogsRouter