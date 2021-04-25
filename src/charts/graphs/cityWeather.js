import WindDirection from "./windDirection"
import Temperature from './temperature'

function CityWeather({cityData}){
    let {weather} = cityData.current

    let date = new Date(weather.ts)
    let month = date.getUTCMonth() + 1
    let day = date.getUTCDate()
    let year = date.getUTCFullYear()

    let formattedDate = `${month}/${day}/${year}`

    let fahrenheit = weather.tp * 1.8 + 32

    return(
        <div id="city">
            <p>{cityData.city}, {cityData.state}</p>
            <p>As of {date.toLocaleTimeString("en-US")}</p>
            <img src={`https://www.airvisual.com/images/${weather.ic}.png`} alt={weather.ic} className="icon" />
            <p>{formattedDate}</p>
            <p>{fahrenheit}</p>
            <WindDirection direction={weather.wd} />
            <Temperature temperature={fahrenheit} humidity={weather.hu}/>
        </div>
    )
}

export default CityWeather