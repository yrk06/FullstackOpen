import axios from "axios"
import { useEffect, useState } from "react"

const WeatherData = ({city})=>{
    const [weatherData, setWeatherData] = useState({})
    useEffect(()=>{
        
        if(city !== undefined){
            console.log("Called API")
            axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then(response => {
                const icon = response.data.weather[0].icon
                setWeatherData({
                    img:`http://openweathermap.org/img/wn/${icon}@2x.png`,
                    temp:Math.floor((response.data.main.temp-273)*10)/10,
                    wind:response.data.wind.speed})
            })
        }
    },[city])

    if(city === undefined || weatherData.img === ''){
        return (<div></div>)
    }
    return (
        <div>
            <h2>Currently in {city} </h2>
            <p>Temperature: {weatherData.temp}<sup>o</sup>C</p>
            <img src={weatherData.img} alt="Clima"/>
            <p>Wind: {weatherData.wind}m/s</p>
        </div>
    )
}

export default WeatherData