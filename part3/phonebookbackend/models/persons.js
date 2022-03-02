const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minLength: 3,
    required: true,
    unique:true
  },
  number: {
    type:String,
    minlength: 8,
    validate: {
      validator: (v) => {
        return /[0-9]{2}[0-9]?-[0-9]{7,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports =  mongoose.model('Person', personSchema)