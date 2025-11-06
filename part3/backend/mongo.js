const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

//Salasanan lukeminen terminaalista
const password = process.argv[2]

const url = `mongodb+srv://santleht_db_user:${password}@cluster0.xwqik6d.mongodb.net/PersonApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
    person.find({}).then(result => {
        console.log("Phonebook:")
        result.forEach(person =>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

//Uuden henkilön lisääminen 

else if (process.argv.length === 5){
    const personObject = new person({
        name:`${process.argv[3]}`,
        number: `${process.argv[4]}`
    })
    personObject.save().then(result => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
})} 

