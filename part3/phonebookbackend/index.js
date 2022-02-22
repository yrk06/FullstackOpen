const express = require('express')
const app = express()
const cors = require('cors')

const morgan = require('morgan')

let persons = [
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
]

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
app.get('/info', (req,res)=>{
    res.send(`The phonebook has info for ${persons.length} ${persons.length === 1 ? 'person':'people'}\n${new Date().toString()}`)
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
app.get('/api/persons', (req,res) => {
    res.json(persons)
})

app.post('/api/persons', (req,res) => {
    const person = {...req.body}
    if(!person.name){
      return res.status(400).send({error: "Name is missing"})
    }
    if(persons.find(el => el.name.toLowerCase() === person.name.toLowerCase() )){
      return res.status(400).send({error: "Name must be unique"})
    }
    if(!person.number){
      return res.status(400).send({error: "Number is missing"})
    }


    person.id = id()
    persons = persons.concat(person)
    res.send(person)
})

app.get('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)

  const person = persons.find(el => el.id === id)
  if(person){
    res.json(person)
  } else {
    res.status(404).json({error:"Invalid ID"})
  }

})

app.delete('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)

  persons = persons.filter(el => el.id !== id)
  res.status(204).end()

})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> console.log(`Server on port ${PORT}`))