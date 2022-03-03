const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    
    const blog = new Blog(request.body)
    const result = (await blog.save()).toJSON()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request,response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {

    const res = await Blog.findByIdAndUpdate(request.params.id,request.body,{ new: true, runValidators: true, context:'query' })
    return res ? response.status(200).json(res) : response.status(404).json({error:"Resource does not exist"})
    
})

module.exports = blogsRouter