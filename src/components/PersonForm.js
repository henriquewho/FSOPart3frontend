import React from 'react'

function PersonForm({onSubmit, valueName, valuePhone, onChangeName, onChangePhone}) {
    return (
        <form onSubmit={onSubmit}>
        <div>
          name:  <input value={valueName} onChange={onChangeName}/> <br/>
          phone: <input value={valuePhone} onChange={onChangePhone}/>
        </div>

        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    )
}

export default PersonForm
