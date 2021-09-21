import React from 'react'
import Person from './Person'

function Persons({persons, search, handleDelete, handleChangeNumber}) {
    return (
        <div>
            {persons.filter(each=>each.name.toLowerCase().includes(search.toLowerCase())).map(each=>{
            return <Person key={each.id} each={each} handleDelete={()=>handleDelete(each.id)} handleChangeNumber={()=>handleChangeNumber(each.id)}/>
            })}
        </div>
    )
}

export default Persons
