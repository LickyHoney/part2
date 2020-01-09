import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () =>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newEntry =>{
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const deletion = personId =>{
    const request = axios.delete(baseUrl + `/${personId}`)
    return request.then(response => response.data)
}

const update = (personId, newNumber) =>{
  const request = axios.put(`${baseUrl}/${personId}`, newNumber)
  return request.then(response => response.data)
}

export default {getAll, create, deletion, update}