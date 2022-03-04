const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


beforeEach( async () => {
    await User.deleteMany({})
})

describe('User creation', () => {

    test("create user with username and password", () => {
        api
        .post("/api/users")
        .send({
            username:"root",
            name: "Root User",
            password:"rootPassword"
        })
        .expect(201)
    })

    test("create user with duplicate username", () => {
        api
        .post("/api/users")
        .send({
            username:"root",
            name: "Root User",
            password:"rootPassword"
        })
        .expect(201)

        api
        .post("/api/users")
        .send({
            username:"root",
            name: "Root User",
            password:"rootPassword"
        })
        .expect(400)
    })

    test("create user with missing username", () => {
        api
        .post("/api/users")
        .send({
            name: "Root User",
            password:"rootPassword"
        })
        .expect(400)
    })

    test("create user with missing name", () => {
        api
        .post("/api/users")
        .send({
            username:"root",
            password:"rootPassword"
        })
        .expect(400)
    })

    test("create user with missing password", () => {
        api
        .post("/api/users")
        .send({
            username:"root",
            name: "Root User",
        })
        .expect(400)
    })
})