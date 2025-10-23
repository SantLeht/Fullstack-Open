const Blogi = require("../models/blogi")
const router = require("express").Router()

router.get('/', async (request, response) => {
  try {
    const blogs = await Blogi.find({})
    response.json(blogs)
  } catch (error) {
    response.status(500).json({ error })
  }
})


router.post('/', async (request, response) => {
  try {
    const blog = new Blogi(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(400).json({ error})
  }
})

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