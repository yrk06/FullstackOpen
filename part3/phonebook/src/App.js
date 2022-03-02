import { useState,useEffect} from 'react'
import PersonsOp from './services/Person'
import { Filter, NewPerson, Persons } from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const [ntfMessage, setNtfMessage] = useState(null)

  useEffect(()=>{
    PersonsOp.allPersons()
    .then(data => {
      setPersons(data)
    })
  },[])

  const submitNewPerson = (event) => {
    event.preventDefault()
    if(persons.filter( el => el.name.toLowerCase() === newName.toLowerCase()).length > 0){
      
      if(window.confirm(`${newName} is already on the book, replace the current number?`)){
        const obj = {...persons.filter( el => el.name.toLowerCase() === newName.toLowerCase())[0]}
        obj.number = newNumber
        PersonsOp.updatePerson(obj)
        .then(newP => {
          setPersons(persons.map(el => el.id !== obj.id ? el : newP))
          setNtfMessage({success: `${newP.name} was updated successfully`})
        })
        .catch((err)=> {
          setNtfMessage(err)
          //setPersons(persons.filter(el => el.id !== obj.id))
        })
      }
    
    } else {
      PersonsOp.addPerson({name:newName,number:newNumber})
      .then(newP => {
        setPersons(persons.concat(newP)) 
        setNtfMessage({success: `${newP.name} was added successfully`})
      })
      .catch(err => {setNtfMessage(err)})
    } 
  }

  const deletePerson = (person)=>{
    if(window.confirm(`Are you sure you want to delete ${person.name} from the book?`)){
      PersonsOp.deletePerson(person.id).then(()=> {
        setPersons(persons.filter(el => el.id !== person.id))
        setNtfMessage({success: `${person.name} was deleted successfully`})
      })
    }
  } 

  const displayNotes = persons.filter(el => el.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <Notification message={ntfMessage}/>
      <h2>Phonebook</h2>
        <Filter filterName={filterName} setFilterName={setFilterName}/>
      <h3>Add a new</h3>

      <NewPerson 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        submitNewPerson={submitNewPerson}
      />
      
      <h2>Numbers</h2>

      <Persons persons={displayNotes} deletePerson={deletePerson}/>

    </div>
  )
}

export default App
