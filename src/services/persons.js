import axios from 'axios'

const baseUrl = '/api/persons'; 

const getAll = () =>{
    const response = axios.get(baseUrl); 
    return response.then(response=>response.data); 
}

const create = newPerson => {
    const response = axios.post(baseUrl, newPerson);
    return response.then(response=>response.data); 
}

const deletePerson = id =>{
    const response = axios.delete(`${baseUrl}/${id}`); 
    return response; 
}

const update = (id, newPerson) => {
    const response = axios.put(`${baseUrl}/${id}`, newPerson); 
    return response.then(resp=>resp.data); 
}

const personsService = {
    create, getAll, deletePerson, update
}

export default personsService