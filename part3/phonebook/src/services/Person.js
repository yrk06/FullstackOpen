/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseURL = '/api/persons'

const allPersons = () =>{
    return axios
    .get(baseURL)
    .then(res => res.data)
}

const addPerson = (person) =>{
    return new Promise( (resolve,reject) => {
    axios
    .post(baseURL,person)
    .then(res => resolve(res.data))
    .catch(err => reject(err.response.data))
    })
}

const updatePerson = (person) =>{
    return new Promise( (resolve,reject) => {
    axios
    .put(`${baseURL}/${person.id}`,person)
    .then(res => resolve(res.data))
    .catch(err => reject(err.response.data))
    })
}

const deletePerson = (person) => {
    return axios
    .delete(`${baseURL}/${person}`)
    .then(res => res.data)
}

export default {addPerson,deletePerson,allPersons,updatePerson}