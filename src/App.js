import './App.css';
import {useState, useEffect} from 'react'
import personsService from './services/persons';

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

function Notification({message, type}) {
  if (!message) return null;
  return (
    <div className={type}>
      {message}
    </div>
  )
}


function App() {
  const [persons, setPersons] = useState([]); 

  const [newName, setNewName] = useState(''); 
  const [newPhone, setNewPhone] = useState(''); 
  const [search, setSearch] = useState(''); 
  const [notification, setNotification] = useState({
    message: '', type: 'success'
  }); 

  const hook = () =>{
    personsService.getAll().then(function(response){
      setPersons(response); 
    })
  }
  useEffect(hook, []); 

  const setNotificationState = (message, type) =>{
    setNotification({message, type});
    setTimeout(()=>setNotification({message:'', success:''}), 3000); 
  }

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNewPhoneChange = (e) => {
    setNewPhone(e.target.value);
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value); 
  }

  function submitForm(e){
    e.preventDefault(); 
    if (newName==='' || newPhone==='') return; 

    // If the new person has the same name as someone from the 
    // list, only this block is run.
    if (persons.some(each=>each.name===newName)) { 
      if (window.confirm(`Create new entry for ${newName}?`)) {

        let newPerson = {
          name: newName, number:newPhone, id: persons.length+1
        }
        personsService.create(newPerson)
        .then(response => {
          setPersons([...persons, response]); 
          setNewName(''); setNewPhone(''); 
          setNotificationState('Person added', 'success'); 
        })
        .catch(err=>{
          setNotificationState('Name must be unique', 'error');
          setNewName(''); setNewPhone('');
        })
        return; 

        /*
        const oldPerson = persons.find(each=>each.name === newName); 
        personsService.update(oldPerson.id, {...oldPerson, phone: newPhone})
        .then(function(resp){
          setPersons(persons.map(each=>(each.id===oldPerson.id)? resp : each));
          setNewName(''); 
          setNewPhone(''); 
          setNotificationState('Person updated', 'success');
        })
        .catch(err =>{
          setNotificationState('The person was already deleted', 'error');
          setNewName(''); setNewPhone(''); 
          setPersons(persons.filter(each=>each.name!==newName));
        })
        return; 
        */

      } else {
        setNewName(''); setNewPhone(''); 
        return; 
      }
    }; 

    // If the person is new, it starts running from here
    let newPerson = {
      name: newName, 
      number: newPhone, 
      id: persons.length+1
    }

    personsService.create(newPerson)
    .then(response => {
      setPersons([...persons, response])
      setNewPhone(''); 
      setNewName(''); 
      setNotificationState('Person added', 'success');
    })
  }

  const handleDelete = (id) =>{
    personsService.deletePerson(id)
    .then(resp => {
      setPersons(persons.filter(each=>each.id!==id)); 
      // create notification here
    })
  }

  const handleChangeNumber = (id) => {
    const person = persons.find(each => each.id === id); 
    const newPerson = {...person, number: newPhone}; 
    //console.log(person, newPerson);

    personsService.update(id, newPerson)
    .then( resp => {
      setNewPhone(''); 
      setNewName(''); 
      setPersons(persons.map(each=>each.id===id ? newPerson : each));
      // create notification here
    })
    .catch (err =>{
      console.log(err);
    })
  }

  return (
    <div className="App">
      <button onClick={()=>setPersons([])}>Clear all</button>
      <h2>Phonebook app</h2>
      <Notification message={notification.message} type={notification.type}/>

      <Filter value={search} onChange={handleSearchChange}/>

      <h2>Add a new Phone</h2>
      <PersonForm onSubmit={submitForm} valueName={newName} valuePhone={newPhone} onChangeName={handleNewNameChange} onChangePhone={handleNewPhoneChange}/>

      <h2>Numbers</h2>
      <Persons persons={persons} search={search} handleDelete={handleDelete} handleChangeNumber={handleChangeNumber}/>
      
    </div>
  );
}

export default App;
