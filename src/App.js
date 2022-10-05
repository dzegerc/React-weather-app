import React, {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import axios from 'axios'

function App() {
    const apiKey = "ce0c9b353e5b5245f05d5b59284930d8"
    const [inputCity, setInputCity] = useState("")
    const [data, setData] = useState({})

    const getWeatherInfo = (cityName) => {
        if (!cityName) return
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=" + apiKey
        axios.get(apiURL).then((res) => {
            console.log("response", res.data)
            setData(res.data)
        }).catch((err) => {
            console.log("err", err)
        })
    }

    const handleChangeInput = (e) => {
        console.log("value", e.target.value)
       setInputCity(e.target.value)
    }

    const handleSearch = () => {
        getWeatherInfo(inputCity)
    }

    return (
        <div className='col-md-12'>
            <div className='background'>
                <h1>Weather App</h1>
                <div className="d-grid gap-3 col-4 mt-4">
                    <input type="text" className="form-control" 
                        value={inputCity}
                        onChange={handleChangeInput}
                        placeholder="Pretraži grad" />
                    <button className="btn btn-primary" type="button" onClick={handleSearch}>Pretraži</button>
                </div>
            </div>
        {Object.keys(data).length>0 &&
            <div className='col-md-12 text-center mt-5'>
                <div className='shadow rounded weatherResultBox'>
                    <h5 className='weatherCity'>{data?.name}</h5>
                    <h6 className='weatherTemp'>{((data?.main?.temp) - 273.15).toFixed(0)}°C</h6>
                </div>                                     
            </div>
        }
        </div>
      
    )
    
}

export default App;