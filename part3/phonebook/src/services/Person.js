/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseURL = '/api/persons'

const allPersons = () =>{
    return axios
    .get(baseURL)
    .then(res => res.data)
}

const addPerson = (person) =>{
    return axios
    .post(baseURL,person)
    .then(res => res.data)
}

const updatePerson = (person) =>{
    return axios
    .put(`${baseURL}/${person.id}`,person)
    .then(res => res.data)
}

const deletePerson = (person) => {
    return axios
    .delete(`${baseURL}/${person}`)
    .then(res => res.data)
}

export default {addPerson,deletePerson,allPersons,updatePerson}