const mongoose = require("mongoose")

// Luodaan blogi skeema

const blogiSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes:{
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

})
// Muokataan JSONia
blogiSchema.set("toJSON", {
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Blogi", blogiSchema)