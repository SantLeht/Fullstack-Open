import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import {useRef} from 'react'

const App = () => {

  //Tilamuuttujat
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error,setError] = useState(null)

  const visibility = useRef()

  // Tykkäyksien käsittely
  const handleLike = async(blog) => {
    const updateBlog = {
      user:blog.user.id,
      likes:blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url:blog.url

    }
    const updatedBlog = await blogService.update(blog.id, updateBlog)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : { ...updatedBlog, user: blog.user }))
  }


  // Tarkistetaan, onko käyttäjä kirjautunut
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  // Uuden blogin luominen

  const createBlog = async(blogObject) =>{
     try {
    const newBlog = await blogService.create(blogObject)
    const blogWithUser = { ...newBlog, user: { name: user.name } }

    setBlogs(blogs.concat(blogWithUser)) 
    setError(null)
    setMessage(`a new blog "${newBlog.title}" by ${newBlog.author} added`)
    setTimeout(() => setMessage(null), 5000)
    visibility.current.toggleVisibility()
  } catch (error) {
    console.error('Blog creation failed:', error)
    setError("failed to create new blog")
    setTimeout(() => setMessage(null), 5000)
  }
  }


  // Blogien hakeminen palvelimelta
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  // Kirjautumisen käsittely
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError("wrong username or password")
      setTimeout(() => setError(null), 5000)
    }
  }

  
  const handleLogout = () =>{
    window.localStorage.removeItem("loggedUser")
    setUser(null)
  }

  
  // Näytetään jos käyttähä ei ole kirjautunut
  if (user === null) {
    return (
      <div>
      <Notification message={message} error={error}/>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      </div>
    )
  }

  // Kirjautuneen käyttäjän näkymä
  return (
  <div>

    <Notification message={message} error={error}/>
    <h2>blogs</h2>
      <p>{user?.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
    <Togglable buttonLabel="new blog" ref={visibility}>
      <BlogForm
      createBlog={createBlog}
      
      />
    </Togglable>
    {blogs.map(blog =>
      <Blog key = {blog.id} blog= {blog} handleLike={handleLike}/>
    )}

   </div>
  )
}

export default App
