

import React, {useState, useEffect} from "react"
import phoneService from "./services/persons.js"

const Display = ({ name, number, id }) => {
    const [ newName, setName ] = useState(name)
    const [ newNumber, setNumber ] = useState(number)
    const [ delButton, setDelButton ] = useState("")

    const HandleDel = (id) =>{
        const del = () =>{
            if(window.confirm(`Delete ${name}\'s number?`)){
                phoneService.deletion(id)
                .then(response => {
                    console.log("contact deleted")
                    setName("")
                    setNumber("")
                    setDelButton("")
                })
            }
        }
        return del
    }

    useEffect(()=>{
        setDelButton(<button onClick={HandleDel(id)}>delete</button>)
    },
    [])

    return(
        <div>
            {newName} {newNumber}
            {delButton}
        </div>
    )
}

const Person = ({ names, regVal }) => {
    const reg = new RegExp(regVal, "i")
    const filteredArray = names.filter((entry) => reg.test(entry.name))
    const namesArray = filteredArray.map((entry) => <Display key={entry.id} name={entry.name} number={entry.number} id={entry.id} />)
    return(
    <div>
        {namesArray}
    </div>
    )
}

export default Person