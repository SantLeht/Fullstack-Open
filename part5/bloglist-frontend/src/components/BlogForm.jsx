import {useState }from "react"

const BlogForm = ({createBlog, user, handleLogout}) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = (event) =>  {
    event.preventDefault()
    createBlog({title, author, url})
    setTitle("")
    setAuthor("")
    setUrl("")
    
  }

  return(
  <div>
      
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input value = {title} onChange={({target}) => setTitle(target.value) }></input>
        </div>
        <div>
          author: <input value = {author} onChange={({target}) => setAuthor(target.value) }></input>
        </div>
        <div>
          url: <input value = {url} onChange={({target}) => setUrl(target.value) }></input>
        </div>
        
       
      <button type ="submit">create</button>
    
    </form>
  </div>  
)}

export default BlogForm
