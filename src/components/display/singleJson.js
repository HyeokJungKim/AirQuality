import React from 'react'

function SingleJSON({json, hoveredDate}){
    const jsonRef = React.useRef(null)
    let {tempmin, tempmax, temp, date} = json

    React.useEffect(() => {
        if(date === hoveredDate){
            jsonRef.current.scrollIntoView()
        }
    }, [hoveredDate, date])

    

    return (
        <li ref={jsonRef} className={hoveredDate === json.date ? "chosen json" : "json"  }>
            <h2>{date}</h2>
            <p>Minimum: <span style={{color: "red"}}>{tempmin || 0}&#8457;</span></p>
            <p>Average: <span style={{color: "green"}}>{temp || 0}&#8457;</span></p>
            <p>Maximum: <span style={{color: "blue"}}>{tempmax || 0}&#8457;</span></p>
        </li>
    )
}

export default SingleJSON