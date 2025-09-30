import axios from "axios";

const url = 'http://localhost:3001/persons'

const getData = () => axios.get(url).then(response => response.data)

const createPerson = (newPerson) => axios.post(url, newPerson).then(response => response.data)

const deletePerson = (id) => axios.delete(`${url}/${id}`)

const updatePerson = (id, updatedPerson) => axios.put(`${url}/${id}`, updatedPerson).then(response =>response.data)

export default {getData, createPerson, deletePerson, updatePerson}