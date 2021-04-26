import SingleJSON from './singleJson'

function JSONDisplay({temperatures, hoveredDate}){

    let jsons = temperatures.map((json) => {
        return (<SingleJSON key={json.date} json={json} hoveredDate={hoveredDate}/>)
    })

    let list = <ol className="forecast">{jsons}</ol>

   return (<aside id="forecastData">
       {temperatures.length > 0 ? list : <h2 className="loading">Loading information from the Visual Crossing API...</h2>}
       
    </aside>)
}

export default JSONDisplay