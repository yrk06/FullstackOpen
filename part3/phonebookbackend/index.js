require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/persons')

const morgan = require('morgan')

/*let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]*/

// Middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

// General
app.get('/info', (req,res,next)=>{
  Person.count({}).then(result => {
    console.log(result)
    res.send(`The phonebook has info for ${result} ${result === 1 ? 'person':'people'}\n${new Date().toString()}`)
  }).catch(err => next(err))
    
})

// Data generation
const id = () => {
  let nid = Math.floor(Math.random() * 10000)
  while(persons.find(el => el.id === nid)){
    nid = Math.floor(Math.random() * 10000)
  }
  return nid
}

// API
app.get('/api/persons', (req,res,next) => {
    Person.find({}).then(response =>{
      res.json(response)
    }).catch(err => next(err))
    
})

app.post('/api/persons', (req,res,next) => {
    const person = {...req.body}
    if(!person.name){
      return res.status(400).send({error: "Name is missing"})
    }
    if(!person.number){
      return res.status(400).send({error: "Number is missing"})
    }

    Person
    .create({
      name: person.name,
      number: person.number
    })
    .then(nperson => {
      console.log(nperson.validateSync())
      nperson.save()
      .then(savedPerson => res.send(savedPerson))
      .catch(err => next(err))
    })
    .catch(err => {
      next(err)
    })
    
    
})

app.get('/api/persons/:id', (req,res,next) => {
  
  Person.findById(req.params.id).then(person => {
    res.json(person)
  }).catch(err => next(err))

})

app.put('/api/persons/:id', (req,res,next) => {
  const body = req.body

  const person = {
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context:'query' })
    .then(updatedPerson => {
      if (updatedPerson){
          res.json(updatedPerson)
      } else {
        res.status(404).json({error:"This person was already deleted"})
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
  
  Person.findByIdAndRemove(req.params.id).then(person => {
    res.status(204).end()
  }).catch(err => next(err))
  

})

app.use((req,res)=>{
  res.status(404).json({error: "Endpoint not found"})
})

app.use((error, request, response, next)=>{
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } 
  if (error.name === "MongoServerError"){
    return response.status(400).send({ error: error.message })
  }

  next(error)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> console.log(`Server on port ${PORT}`))