function getCityDataAQ(lat, lon){
    return fetch(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_AIRVISUAL_API}`)
        .then(res => res.json())
  
}

function getHistory(lat, lon){
     return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=${process.env.REACT_APP_VISUALCROSSING_API}&include=obs%2Cstats&elements=tempmax,tempmin,temp`)
        .then(res => res.json())
        
}

export {getCityDataAQ, getHistory}