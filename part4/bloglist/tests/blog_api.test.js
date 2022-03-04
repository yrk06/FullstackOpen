const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const { initialBlog, nonExistingId, blogsInDb, rootUser} = require('./test_helper')

let authToken
beforeEach( async () => {
    await User.deleteMany({})
    await (new User(rootUser)).save()

    const res = await api
    .post('/api/login')
    .send({username:"root", password:"rootPassword"})
    authToken = res.body.token


    await Blog.deleteMany({})
    const blogs = initialBlog.map(b => new Blog(b))
    const blogsPromise = blogs.map(b => b.save())
    await Promise.all(blogsPromise)
})

describe('Blog API', () => {

    test('Fetch Blogs', async () => {
        const data = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
        expect(data.body).toHaveLength(initialBlog.length)
    }) 

    test('Create Blog', async ()=> {
        const res = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send({title:"TBD",author:"NA",url:"https://fullstackopen.com/",likes:100})
        .expect(201)
        
        delete res.body.id
        delete res.body.user
        expect(res.body).toEqual({title:"TBD",author:"NA",url:"https://fullstackopen.com/",likes:100})
        expect((await blogsInDb()).length).toBe(initialBlog.length +1)
    })

    test('All blogs have unique identifier', async () => {

        (await blogsInDb()).forEach(blog => expect(blog.id).toBeDefined())
    })

    test('Create Blog with 0 likes', async () => {
        const res = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send({title:"TBD",author:"NA",url:"https://fullstackopen.com/"})
        .expect(201)
        
        delete res.body.id
        delete res.body.user
        expect(res.body).toEqual({title:"TBD",author:"NA",url:"https://fullstackopen.com/",likes:0})
        expect((await blogsInDb()).length).toBe(initialBlog.length +1)
    })

    test('Create Blog without title and author', async () => {
        const res = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authToken}`)
        .send({url:"https://fullstackopen.com/"})
        .expect(400)

        expect((await blogsInDb()).length).toBe(initialBlog.length)
    })

    test("Delete invalid blog", async () => {
        const id = await nonExistingId()

        await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404)

        expect((await blogsInDb()).length).toBe(initialBlog.length)
    })

    test("Delete valid blog", async () => {
        const id = (await blogsInDb())[0].id

        await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204)

        expect((await blogsInDb()).length).toBe(initialBlog.length-1)
    })

    test("Update valid person likes", async () => {
        const id = (await blogsInDb())[0].id
        const likes = (await blogsInDb())[0].likes

        const res = await api
        .put(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({likes:likes+1})
        .expect(200)

        expect((await blogsInDb())[0].likes).toBe(likes +1)
    })

    test("Update invalid person", async () => {
        const id = await nonExistingId()

        await api
        .put(`/api/blogs/${id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({likes:100})
        .expect(404)
    })
})

afterAll(() => {
    mongoose.connection.close()
})