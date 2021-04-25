import WindDirection from "./windDirection"
import Temperature from './temperature'

function CityWeather({cityData}){
    let {weather} = cityData.current

    let date = new Date(weather.ts)
    let month = date.getUTCMonth() + 1
    let day = date.getUTCDate()
    let year = date.getUTCFullYear()

    let formattedDate = `${month}/${day}/${year}`

    let fahrenheit = Math.round(weather.tp * 1.8 + 32)

    let url = weather.ic === "04n" || weather.ic === "03n"  ?`http://openweathermap.org/img/w/${weather.ic}.png` : `https://www.airvisual.com/images/${weather.ic}.png`
    return(
        <aside id="city">
            <img src={url} alt={weather.ic} className="icon" />
            <h2 className="name">{cityData.city}, {cityData.state}</h2>
            <p className="temp">{fahrenheit}&#8457;</p>
            <p>As of {date.toLocaleTimeString("en-US").replace(/:\d+ /, ' ')}</p>
            <p>{formattedDate}</p>
            <div className="graphs">
                <WindDirection direction={weather.wd} speed={weather.ws}/>
                <Temperature temperature={fahrenheit} humidity={weather.hu}/>
            </div>
        </aside>
    )
}

export default CityWeather