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
    console.log(fahrenheit);
    return(
        <div>
            {cityData.city}
            <WindDirection direction={weather.wd} />
            <Temperature temperature={90} humidity={weather.hu}/>
            <p>Weather for {formattedDate}</p>
            <img src={`https://www.airvisual.com/images/${weather.ic}.png`} alt={weather.ic} />
        </div>
    )
}

export default CityWeather