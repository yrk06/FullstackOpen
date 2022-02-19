import {useState, useEffect} from 'react'
import DisplayResults from './components/DisplayResults'
import axios from 'axios'
import Country from './components/Country'
import WeatherData from './components/WeatherData'

const App = ()=> {

  const [countryList, setCountryList] = useState([])
  const [filter, setFilter] = useState('')
  const [activeView, setActiveView] = useState(undefined)

  useEffect( () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountryList(response.data)
      })
  },[])

  const displayCountries = countryList.filter(el => el.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  useEffect( ()=> {
    if(displayCountries.length === 1){
      setActiveView(displayCountries[0])
    }
  },[displayCountries])

  return (
    <div>
      <div>
        find countries: <input value={filter} onChange={(e)=>setFilter(e.target.value)}/>
      </div>
      <DisplayResults results={displayCountries} setActive={setActiveView}/>
      <Country country={activeView} />
      <WeatherData city={activeView ? activeView.capital : undefined} />
    </div>
  );
}

export default App;
