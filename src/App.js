import './App.css';
import {useState} from 'react'
import city from './data/city'

import USA from "./charts/maps/USA"
import CityWeather from "./charts/graphs/cityWeather"

function App() {

  const [cityData, setCityData] = useState(city)

  return (
    <div className="App">
      <main>
        <USA setCityData={setCityData}/>
        <CityWeather cityData={cityData} />
      </main>
    </div>
  );
}

export default App;
