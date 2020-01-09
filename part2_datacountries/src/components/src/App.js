import React, { useState, useEffect } from 'react'

import axios from 'axios'

//4fea44ca1f2e1741f52a446840ce8cbb api key

const DisplayCountry = ({ country }) =>{
  const [ newCountry, setCountry ] = useState("")
  const [ newHide, setHide] = useState("show")

  const onClickHandler = () =>{
    if(newHide === "show"){
      setHide("hide")
      setCountry(<DisplaySingleCountry country={country} />)
    }else{
      setHide("show")
      setCountry("")
    }
    
  }

  return(
    <div>
      {country.name}
      <button onClick={onClickHandler} >{newHide}</button>
      {newCountry}
    </div>
  )
}



  

/*const DisplayWeather = ({ cityWeather, cityName }) =>{
  return(
    <div>
      <h2>Weather in {cityName}</h2>
      <p><strong>temperature: </strong>{cityWeather.main.temp} Fahrenheit</p>
      <img src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`} alt={"weather icon"} ></img>
      <p><strong>Wind:</strong> {cityWeather.wind.speed} km/h </p>
    </div>
  )
}*/

const DisplaySingleCountry = ({ country }) =>{
  const [ newWeather, setWeather] = useState("")
  const [ weatherStatus, setWeatherStatus ] = useState("Show weather")
  const capital = country.capital
  const currency = country.currency

  /*const onClickWeather = () =>{
    if(weatherStatus === "Show weather"){
      setWeatherStatus("Hide weather")
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=4fea44ca1f2e1741f52a446840ce8cbb`)
        .then(response=> setWeather(<DisplayWeather cityName={capital} cityWeather={response.data} />))
    }else{
      setWeatherStatus("Show weather")
      setWeather("")
    }
     
  }*/

  const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)

  return(
    <div>
      <h2>{country.name}</h2>
      <p>Capital: <strong>{capital}</strong></p>
      <p>Currency:<strong>{currency}</strong></p>
      
      <h2>languages</h2>
      <ul>{languages}</ul>
      <img src={country.flag} alt={"flag"} width={"200 px"} height={"200 px"}></img>
    </div>
  )
}

const DisplayCountries = ({ countries, regVal }) =>{
  const regExp = new RegExp(regVal, "i")
  const filteredCountries = countries.filter(country => regExp.test(country.name))
  if(filteredCountries.length === 1){
    return(
      <DisplaySingleCountry country={filteredCountries[0]}  />
    )
  }else if (filteredCountries.length > 10){
    return(
      <p>
        Too many matches, specify another filter
      </p>
    )
  }else{
    const allCountries = filteredCountries.map(country => <DisplayCountry key={country.name} country={country} />)
    return(
      <div>
        {allCountries}
      </div>
    )
  }
}

const App = () => {
  const [ newCountries, setCountries] = useState([])
  const [ newCountry, setCountry ] = useState('')
  
  const changeHandlerName = (event) => {
    setCountry(event.target.value)
  }

  useEffect(()=>{
    axios.get(`https://restcountries.eu/rest/v2/all`)
    .then(response =>{
      setCountries(response.data)
    })
  },[])

  return (
    <div>
      find countries: 
      <input 
      onChange = {changeHandlerName}
      value = {newCountry}
     />
      <DisplayCountries countries={newCountries} regVal={newCountry}  />
    </div>
  )
}

export default App