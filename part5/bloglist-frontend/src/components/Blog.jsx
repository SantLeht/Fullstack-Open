import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [visibility, setVisibility] = useState(false)
  

  // Funktio näkyvyyden vaihtamiselle
  const toggleVisibility = () => {
    setVisibility(!visibility)
  }
  
  
    
    return(
    <div className="Blog">
      <div>
        {blog.title} — {blog.author}
        <button onClick={toggleVisibility}>
          {visibility?'hide': 'view'}
        </button>
      </div>
      
      {visibility && (
       <div>
        <div>{blog.url}</div>
        <div>{blog.like}<button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>
        {blog.user?.name}
        </div>


        </div>
      
    

      )}
    </div>
    )}
    

export default Blog
