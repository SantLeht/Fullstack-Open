const mongoose = require("mongoose")
const app = require("./app")
const config = require("./utils/config")

// MongoDB yhteys
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log("Yhdistetty MongoDB")
    app.listen(config.PORT, ()=> {
      console.log(`${config.PORT}`)
    })
    })
    .catch((error) =>{
      console.log(error.message)
    
  })
