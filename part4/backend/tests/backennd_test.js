const { test, before, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blogi = require('../models/blogi')


const api = supertest(app)


const config = require('../utils/config')


before(async () => {
  await mongoose.connect(config.MONGODB_URI)
})


// Tyhjennetään blogit ja lisätään yksi testiblogi
beforeEach(async () => {
  await Blogi.deleteMany({})
  await Blogi.create({
    title: 'Testiblogi',
    author: 'Lehtis',
    url: 'http://testi.com',
    likes: 5
  })
})

//Testi: varmistetaan, että blogit palautuvat oikein.

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogsTotal = await Blogi.find({})
    if (response.body.length !== blogsTotal.length){
        throw new Error(`Total ${blogsTotal.length}, expected ${response.body.length} `)

    }
})

//Testi: tarkistetaan blogien id-kenttä

test("id testi ", async () =>{
  const response = await api.get("/api/blogs")
    
  for(const blog of response.body){
    console.log(blog.id)
    if(!blog.id){
      throw new Error("no id")
  }
    if (blog._id){
      throw new Error("Shouldn't contain _id")
    }
  }
})

// Testi: uuden blogin lisääminen

test("add new blog", async () => {
  const newBlog = {
    title:"uusi testi",
    author: "Matti",
    url:"www.testii.fi",
    likes:2
  }

  const blogsBefore = await Blogi.find({})
  console.log(blogsBefore)

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)


  console.log(response.body)


  const blogsAfter = await Blogi.find({})
  console.log(blogsAfter)

  if(blogsAfter.length !== blogsBefore.length +1){
    throw new Error ("Failed")
  }

  console.log("Blog added")
})


// Testi: blogin poistaminen
test("delete test", async ()=>{
  const blogs = await Blogi.find({})
  const blogsToDelete = blogs[0]

  const response = await api
    .delete(`/api/blogs/${blogsToDelete.id}`)
    .expect(204)

  const blogsEnd = await Blogi.find({})
  const id = blogsEnd.map(b => b.id)

  if(blogsEnd.length !== blogs.length -1){
    throw new Error("Blogien määrä ei muuttunut")
  }
  if (id.includes(blogsToDelete.id)){
    throw new Error("Blogi ei poistunut")
  }

  console.log("Blogi poistettu")
})


    


after(async () => {
  await mongoose.connection.close()
})