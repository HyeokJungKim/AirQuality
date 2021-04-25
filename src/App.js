import "./App.css";
import {useState} from "react"
import city from "./data/city"
import temperatureArr from "./data/forecast"

import USA from "./components/maps/USA"
import CityWeather from "./components/graphs/cityWeather"
import Forecast from "./components/graphs/forecast"
import JSONDisplay from "./components/display/json-display"



function App() {

  const [cityData, setCityData] = useState(city)
  const [temperatures, setTemperatures] = useState(temperatureArr)

  return (
    <main className="App">
      <h1>USA Weather</h1>
      <article id="top">
        <USA setCityData={setCityData}/>
        <CityWeather cityData={cityData} />
      </article>

      <article id="bottom">
        <Forecast temperatures={temperatures} />  
        <JSONDisplay temperatures={temperatures} />
      </article>
    </main>
  );
}

export default App;
