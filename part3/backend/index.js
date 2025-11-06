require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const Person = require("./models/person")
const { request } = require("http")


//middlewaret
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

app.use(express.static(path.join(__dirname, 'build')))


//Reititykset

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'build', 'index.html'))
})

//Henkilöiden hakeminen
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

//Infosivu 
app.get('/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        const date = new Date()
        response.send(`
            <p>Phonebook has info for ${count} people</p>
            <p>${date}</p>`)
    })
    
})

//Yksittäinen henkilö ID:n avulla
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then (person =>{
        if(person){
            response.json(person)
        }else{
            response.status(404).end()
    }
    })
    .catch(error => next(error))
})

// Henkilön poisto ID:n perusteella
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then (() => response.status(204).end())
        .catch(error=> next(error))
})


// Uuden henkilön lisääminen
app.post('/api/persons', (request, response, next) => {

    const {name, number} = request.body

    if(!name || !number){
        return response.status(400).json({error: "name or number missing"})
    }

    const person = new Person({name,number})

    person.save()
        .then(savedPerson => response.json(savedPerson))
        .catch(error => next(error))
    

    
    
})

// Henkilötiedon päivittäminen
app.put('/api/persons/:id', (request, response, next)=>{
    const {name, number} = request.body
    
    const updatedPerson = {
        name,
        number
    }
    Person.findByIdAndUpdate(request.params.id, updatedPerson, {new:true, runValidators:
        true, context: "query"
    })
        .then (updated => {
            response.json(updated)
        })
        .catch(error => next(error))
})

// Virheidenkäsittely
const errorHandler = (error, request, response, next) =>{
    console.error(error.message)
    
    if(error.name === "CastError"){
        return response.status(400).send({error: "malformatted id"})
    }

    if(error.name === "ValidationError"){
        return response.status(400).json({error: error.message})
    }
    if(error.code === 11000){
        return response.status(400).json({error:"name must be unique"})
    }
    return response.status(500).json({error:"error"})
}
app.use(errorHandler)



const PORT = 3001
app.listen(PORT, () => {
    console.log(`${PORT}`)
})