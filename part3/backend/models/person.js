const mongoose = require("mongoose")

mongoose.set("strictQuery", false)


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Yhdistetty MongoDB:hen")
  })
  .catch(error => {
    console.error("MongoDB-yhteys epäonnistui:", error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3]

  },
  number: String
})

personSchema.set("toJSON", {
  transform: (document, personObject) => {
    personObject.id = personObject._id.toString()
    delete personObject._id
    delete personObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)
