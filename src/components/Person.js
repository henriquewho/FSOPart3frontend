import React from 'react'

function Person({each, handleDelete, handleChangeNumber}) {
    return (
        <p>Name: {each.name} - Phone: {each.number} <button onClick={handleDelete}>Delete</button>  <button onClick={handleChangeNumber}>Change Number</button></p>
    )
}

export default Person
