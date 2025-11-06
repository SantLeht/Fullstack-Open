import axios from 'axios'
const baseUrl = "http://localhost:3003/api/blogs"

//Token muuttuja johon tallennetaan kirjautuneen henkilön token
let token = null 

// Funktio tokenin asettamiselle
const setToken = newToken =>{
  token = `Bearer ${newToken}`
}

//BLogien hakeminen
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


// Uuden blogin luominen
const create = async newBlog => {
  const config = {
    headers: {Authorization:token}
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data

}
// Olemassa olvan blogin päivittäminen
const update = async(id, updatedBlog) =>{
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

export default { getAll, create, update, setToken}