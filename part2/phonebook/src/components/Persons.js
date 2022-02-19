const Filter = ({filterName, setFilterName}) => {
    const onFilterNameChanged = (event) =>{
      setFilterName(event.target.value)
    }
    return (
    <div>
        Filter by: <input value={filterName} onChange={onFilterNameChanged} />
    </div>
    )
  }
  
const NewPerson = ({newName,setNewName,newNumber, setNewNumber,submitNewPerson}) => {

    const onNewNameChanged = (event) =>{
        setNewName(event.target.value)
    }

    const onNewNumberChanged = (event) =>{
        setNewNumber(event.target.value)
    }


    return (
        <form onSubmit={submitNewPerson}>
            <div>
            name: <input value={newName} onChange={onNewNameChanged} />
            </div> 
            <div>
            number: <input value={newNumber} onChange={onNewNumberChanged} /></div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

const Person = ({person,deletePerson}) => {
    return <li>{person.name} {person.number} <button onClick={() => deletePerson(person)}>Delete</button></li>
}

const Persons = ({persons,deletePerson}) => {
return (
    <ul>
    {persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson}/>)}
    </ul>
)
}

export {Persons,Filter,NewPerson}