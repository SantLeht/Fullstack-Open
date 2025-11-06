const Blogi = require("../models/blogi")
const router = require("express").Router()
const User = require("../models/users")

// kaikki blogit tietokannasta

router.get('/', async (request, response) => {
  try {
    const blogs = await Blogi.find({}).populate("user", {username: 1, name: 1})
    response.json(blogs)
  } catch (error) {
    response.status(500).json({ error })
  }
})


// Käyttäjän hakeminen ja uuden blogin lisääminen


router.post('/', async (request, response) => {
  try {
    const users = await User.find({})

    const user = users[0]
    const blog = new Blogi({...request.body, user: user._id})
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)

    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(400).json({ error})
  }
})

// Blogin poistaminen ID:n perusteella

router.delete('/:id', async (request, response) => {
  try {
    const deleteBlog = await Blogi.findByIdAndDelete(request.params.id)
    
    if(!deleteBlog){
      return response.status(404).json({error: "not found"})
    }

    response.status(204).end()
  } catch (error){
    response.status(400).json({error: error.message})
  }
})


module.exports = router