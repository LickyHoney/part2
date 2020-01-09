import React, { useState, useEffect } from 'react'

import phoneService from "./services/persons"
import ErrorSuccess from "./ErrorHandleMessage"

import "./index.css"

const DisplayEntry = ({ name, number, deleteHandler, id }) =>{
  return(
    <div>
      {name} {number}
      <button onClick={() => deleteHandler(id)}>
        delete
      </button>
    </div>
  )
}

const DisplayEntries = ({ entries, regVal, onClickDeleteHandler }) =>{
  const regExp = new RegExp(regVal, "i")
  const filteredEntries = entries.filter(entry => regExp.test(entry.name))
  const newEntries = filteredEntries.map(entry => <DisplayEntry key={entry.id} name={entry.name} number={entry.number} deleteHandler={onClickDeleteHandler} id={entry.id} />)

  return(
    <div>
      {newEntries}
    </div>
  )
}

const App = () =>{
  const [ personName, setPersonName ] = useState("")
  const [ personNumber, setPersonNumber ] = useState("")
  const [ newFilter, setNewFilter ] = useState("")
  const [ entryList, setEntryList ] = useState([])
  const [ errorSuccess, setErrorSuccess ] = useState("")

  const changeHandlerName = (event) => setPersonName(event.target.value)

  const changeHandlerNumber = (event) => setPersonNumber(event.target.value)

  const changeHandlerFilter = (event) => {
    //maybe we can do something better with this, as it needs to send
    //request to the server in order to filder the data, main issue
    //is the DisplayEntries component
    const value = event.target.value
    phoneService
      .getAll()
      .then(phoneDatabase =>{
        setNewFilter(value)
        setEntryList(<DisplayEntries 
          entries={phoneDatabase}
          regVal={value}
          onClickDeleteHandler={deleteHandler}
           />)
        })
  }

  const deleteHandler = entryId =>{
    if(window.confirm(`Do you really wish to delete ths number?`)){
      phoneService
      .deletion(entryId)
      .then(()=>{
        setPersonName("")
        setPersonNumber("")
        phoneService
        .getAll()
        .then(phoneDatabase =>{
          setEntryList(<DisplayEntries 
            entries={phoneDatabase}
            regVal={newFilter}
            onClickDeleteHandler={deleteHandler}
             />)
        })
      })
    }
  }

  const submitHandler = event =>{
    event.preventDefault()
    phoneService
    .getAll()
    .then(phoneDatabase =>{
      const newPhoneDatabase = [...phoneDatabase]
      if(newPhoneDatabase.some(entry => entry.name === personName)){
        if(window.confirm(`${personName} is already added to the phonebook, replace the old number with the new one?`)){
          const phoneToReplaceId = newPhoneDatabase.find(entry => entry.name === personName).id
          const newEntry2 = {
            name: personName,
            number:personNumber
          }
          phoneService
          .update(phoneToReplaceId, newEntry2)
          .then(() =>{
            phoneService
            .getAll()
            .then(phoneDatabase =>{
              setPersonName("")
              setPersonNumber("")
              setEntryList(<DisplayEntries 
                entries={phoneDatabase}
                regVal={newFilter}
                onClickDeleteHandler={deleteHandler}
              />)
            })
          })
          .catch(() =>{
            setErrorSuccess(<ErrorSuccess 
              message={`The information of ${newEntry2.name} has already been removed from the server `}
              success={false}
              callback={() => setTimeout(() => setErrorSuccess(""), 5000)}
            />)
            phoneService
            .getAll()
            .then(phoneDatabase =>{
              setPersonName("")
              setPersonNumber("")
              setEntryList(<DisplayEntries 
                entries={phoneDatabase}
                regVal={newFilter}
                onClickDeleteHandler={deleteHandler}
              />)
            })
          })
        }
        //no nothing otherwise
      }else{
        const newEntry = {
          name: personName,
          number: personNumber
        }
        phoneService
        .create(newEntry)
        .then(addedPhone=>{
          setPersonName("")
          setPersonNumber("")
          setErrorSuccess(<ErrorSuccess 
            message={`added ${addedPhone.name}`}
            success={true}
            callback={() => setTimeout(() => setErrorSuccess(""), 5000)} 
            />)
          setEntryList(<DisplayEntries 
            entries={newPhoneDatabase.concat(addedPhone)}
            regVal={newFilter}
            onClickDeleteHandler={deleteHandler}
             />)
        })
      }
    })
  }

  useEffect(()=>{
    phoneService
    .getAll()
    .then(phoneDatabase=> setEntryList(
    <DisplayEntries
      entries={phoneDatabase}
      regVal={newFilter}
      onClickDeleteHandler={deleteHandler}
       />))
  },
  [])

  return(
    <div>
       <div>
      <div>
      <h1>Phonebook</h1>
      </div>
      <div>
        filter shows with: <input
        type="text"
        placeholder="Search"
        onChange={changeHandlerFilter} Value={newFilter}
      />
      </div>
      <div>
      <form onSubmit={submitHandler}>
      <h1>add a new</h1>
        name:
        <input
          
          onChange={changeHandlerName}
        value={personName}
        />
        <br/>
        number:
         <input
          
          onChange={changeHandlerNumber}
          value={personNumber}

        />
        
      
      <div>
          <button type="submit">add</button>
        </div>
        </form>
        </div>
        
<div>
<h2>Numbers</h2>

      
      
      
      {entryList}
      </div>
    </div>
       
       
       
          
       
       
     </div>
  )
}

export default App
 /*return (
    <div>
      <div>
      <h1>Phonebook</h1>
      </div>
      <div>
        filter shows with: <input
        type="text"
        placeholder="Search"
        onChange={HandleFilter}
        Value={searchFilter}
      />
      </div>
      <div>
      <form onSubmit={submit}>
      <h1>add a new</h1>
        name:
        <input
          
          onChange={HandleName}
        Value={newName}
        />
        <br/>
        number:
         <input
          
          onChange={HandleNumber}
          Value={newNumber}

        />
        
      
      <div>
          <button type="submit">add</button>
        </div>
        </form>
        </div>
        
<div>
<h2>Numbers</h2>

      
      
      
      {persons}
      </div>
    </div>
  )*/


