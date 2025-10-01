import axios from "axios";

const url = 'http://localhost:3001/api/persons'

const getData = () =>{ 
    return axios.get(url).then(response => response.data)
}

const createPerson = (newPerson) =>{ 
    return axios.post(url, newPerson).then(response => response.data)
}

const deletePerson = (id) =>{ 
    return axios.delete(`${url}/${id}`)
}

const updatePerson = (id, updatedPerson) => {
    return axios.put(`${url}/${id}`, updatedPerson).then(response =>response.data)
}

export default {getData, createPerson, deletePerson, updatePerson}