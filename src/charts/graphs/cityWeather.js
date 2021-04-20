function CityWeather({cityData}){
    let {weather} = cityData.current

    let date = new Date(weather.ts)
    let month = date.getUTCMonth() + 1
    let day = date.getUTCDate()
    let year = date.getUTCFullYear()

    let formattedDate = `${month}/${day}/${year}`

    return(
        <div>
            {cityData.city}
            <p>Weather for {formattedDate}</p>
            <img src={`https://www.airvisual.com/images/${weather.ic}.png`} alt={weather.ic} />
        </div>
    )
}

export default CityWeather