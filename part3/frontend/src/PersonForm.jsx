const PersonForm = ({newName, setNewName, newNumber, setNewNumber, addPerson}) => {
    return(
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={(event)=>setNewName(event.target.value)}></input>
            </div>
            <div>
                number: <input value={newNumber} onChange={(event)=>setNewNumber(event.target.value)}></input>
            </div>
            <button type ='submit'>add</button>
        </form>
    )
}

export default PersonForm