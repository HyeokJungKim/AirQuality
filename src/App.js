import "./App.css";
import {useState} from "react"
import city from "./data/city"
import temperatureArr from "./data/forecast"

import USA from "./components/maps/USA"
import CityWeather from "./components/graphs/cityWeather"
import Forecast from "./components/graphs/forecast"
import JSONDisplay from "./components/display/jsonDisplay"

function App() {

  const [cityData, setCityData] = useState(city)
  const [temperatures, setTemperatures] = useState(temperatureArr)
  const [hoveredDate, setHoveredDate] = useState("")


  return (
    <main className="App">
      <h1 id="heading">USA Weather</h1>
      <article id="top">
        <USA setCityData={setCityData} setTemperatures={setTemperatures}/>
        <CityWeather cityData={cityData} />
      </article>

      <article id="bottom">
        <Forecast 
          temperatures={temperatures} 
          cityName={cityData.city} 
          stateName={cityData.state} 
          setHoveredDate={setHoveredDate} 
        />  
        <JSONDisplay temperatures={temperatures} hoveredDate={hoveredDate}/>
      </article>
    </main>
  );
}

export default App;
