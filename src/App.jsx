import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformations from './WeatherInformations/WeatherInformations'
import WeatherInformations5Days from './WeatherInformations5Days/WeatherInformations5Days'

function App() {
  const [weather, setWeather] = useState()
  const [weather5Days, setWeather5Days] = useState()

  const inputRef = useRef()

  async function searchCity(){
    const city = inputRef.current.value

    const key = "cb24804aca9b3a19690244edc902e4a8"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    const forecastData = await axios.get(urlForecast)

    const apiData = await axios.get(url)
    setWeather(apiData.data)

    setWeather5Days(forecastData.data)

    console.log(forecastData.data)
  }

  return (
    <>
     <div className='container'>
      <h1>Previsão do tempo</h1>
      <input ref={inputRef} type="text" placeholder='Digite o nome da cidade'/>
      <button onClick={searchCity}>Buscar</button>

      {weather && <WeatherInformations weather={weather}/>}
      {weather5Days && < WeatherInformations5Days weather5Days={weather5Days}/>}
     </div>
    </>
  )
}

export default App
