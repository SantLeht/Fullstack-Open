import { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Filter from './Filter'
import Numbers from './Numbers'
import Functionality from './Functionality'
import Notification from './Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')
  const [addMessage, setAdd] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  
  //datan haku palvelimelta

  useEffect(()=> {
    Functionality
      .getData()
      .then(data=>{
        setPersons(data)
    })
      .catch(error=>{
        console.error(error)
    })
  },[])


   //Virheilmoitukset

  const alertName = (name) => {
    alert(`${name} is already added to phonebook`)
  }

  const alertNumber = (number) => {
    alert(`${number} is already added to phonebook`)
  }

  const filterNames = persons.filter(person =>
  typeof person?.name === 'string' &&
  person.name.toLowerCase().includes(newSearch.toLowerCase())
)



  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name == newName)

    if(existingPerson){
      if(window.confirm(`${newName} is already added to phonebook replace old number with new one?`)){
        const updatedPerson = {
          name: newName,
          number: newNumber
        }
        
        //Tietojen päivittäminen

        Functionality
          .updatePerson(existingPerson.id, updatedPerson)
          .then(returned => {
            setPersons(persons.map(person => person.id != existingPerson.id ? person :returned))
            setNewName('')
            setNewNumber('')
            setAdd(`Updated ${updatedPerson.name}`)
            setTimeout(()=>{
              setAdd(null)
                },5000)
            })
          .catch(error=>
            {console.error(error)}
            )
    }
    return
  }

    //Duplikaattien tarkistus

    const duplicateName = persons.some(person => person?.name == newName)
    if(duplicateName){
      alertName(newName)
      return null
    }
    const duplicateNumber = persons.some(person => person?.number == newNumber)
    if(duplicateNumber){
      alertNumber(newNumber)
      return null
    }
    const person ={
      name: newName,
      number: newNumber,
      
    }
    Functionality
      .createPerson(person)
      .then(response=>{
        setPersons(prevPersons => prevPersons.concat(response))
        setNewName('')
        setNewNumber('')
        setAdd(`Added ${person.name}`)
        setTimeout(()=>{
            setAdd(null)
          },5000)
        console.log(response)
      })
      .catch(error=> {
        console.log(error.response?.data ||error.message)
        setErrorMessage(error.response?.data?.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id,name) => {
    if(window.confirm(`delete ${name}?`))
      Functionality
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id != id))
          setAdd(`Deleted ${name}`)
          setTimeout(()=>{
            setAdd(null)
          },5000)
          
        })

  }


  
   
  

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={addMessage} type = "success"/>
        <Notification message={errorMessage} type = "error"/>
        <div>
          <Filter
          newSearch={newSearch}
          setSearch={setSearch}
          />
        </div>
        <h2>add a new</h2>
        <div>
          <PersonForm
          newName = {newName}
          setNewName = {setNewName}
          newNumber = {newNumber}
          setNewNumber ={setNewNumber}
          addPerson = {addPerson}
          />
        </div>
        <div>
    
        </div>
      
      <h2>Numbers</h2>
        <Numbers
        filterNames = {filterNames}
        deletePerson = {deletePerson}
        
        
        />
      
    </div>
  )

}



export default App
