import React from "react"
import * as d3 from "d3"

class Forecast extends React.Component{

    componentDidMount(){
        this.renderLineGraph()
    }

    renderLineGraph(){
        this.w = 750
        this.h = 500
        
        let margin = 50
        let height = this.h - margin * 2
        let width = this.w - margin * 2

        let svg = d3.select("#forecast").append("svg")
            .attr("viewBox", `0 0 ${this.w} ${this.h}`)

        let chart = svg.append("g")
            .attr("transform", `translate(${margin}, ${margin})`)

        let xScale = d3.scalePoint()
            .rangeRound([0, width])
            .domain(this.props.temperatures.map(({date}) => date))
            .padding(0.2)
        
        let yScale = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain(d3.extent(this.props.temperatures, function(d){
                return d.temp
            }))
            .nice()

        chart.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))

        chart.append("g")
            .call(d3.axisLeft(yScale))

        this.line = d3.line()
            .x(function(d) { return xScale(d.date) })
            .y(function(d) { return yScale(d.temp) })


        this.graph = svg.append("g")
            .attr("transform", `translate(${margin}, ${margin})`)

        this.graph.append("path")
            .datum(this.props.temperatures)
            .attr("fill", "none")
            .attr("stroke", "#534B62")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", this.line);

        this.graph.selectAll("circle")
            .data(this.props.temperatures)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return xScale(d.date) })
            .attr("cy", function(d) { return yScale(d.temp) })
            .style("fill", "#1B1725")
    }

    


    
    render(){
        return(
            <div id="forecast">
                <button>Min</button>
                <button>Max</button>
                <button>Average</button>
            </div>
        )
    }
}

export default Forecast