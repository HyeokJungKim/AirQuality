import React from "react"
import * as d3 from "d3"

class Forecast extends React.Component{

    state = {
        chosen: "tempmin"
    }
    
    componentDidMount(){
        this.w = 750
        this.h = 500
        this.margin = 50
        this.height = this.h - this.margin * 2
        this.width = this.w - this.margin * 2
        this.renderLineGraph()
    }

    renderLineGraph(){
        let svg = d3.select("#forecast").append("svg")
            .attr("viewBox", `0 0 ${this.w} ${this.h}`)

        let chart = svg.append("g")
            .attr("transform", `translate(${this.margin}, ${this.margin})`)

        this.graph = svg.append("g")
            .attr("transform", `translate(${this.margin}, ${this.margin})`)
   
        this.xAxis = chart.append("g")
            .attr("transform", `translate(0, ${this.height})`)
        this.yAxis = chart.append("g")
        
        this.renderSpecificGraph()
    }

    // HELPER: Math for YScale 
    calculateYScale(){
        let minTemps = this.props.temperatures.map(({tempmin}) => tempmin)
        let maxTemps = this.props.temperatures.map(({tempmax}) => tempmax)

        return [d3.min(minTemps), d3.max(maxTemps)]
    }
   

    //HELPER: [xScale, yScale]
    getScales(){
        let xScale = d3.scalePoint()
            .rangeRound([0, this.width])
            .domain(this.props.temperatures.map(({date}) => date))
            .padding(0.2)
        
        let yScale = d3.scaleLinear()
            .rangeRound([this.height, 0])
            .domain(this.calculateYScale())
            .nice()

        return [xScale, yScale]
    }

    // HELPER:
    labelAxes(xScale, yScale){
        this.yAxis.transition()
            .duration(500)
            .call(d3.axisLeft(yScale))

        this.xAxis.transition()
            .duration(500)
            .call(d3.axisBottom(xScale))
            
    }

    // HELPER:
    renderLineAndPoints(xScale, yScale){
        let {chosen} = this.state

        this.lineFunc = d3.line()
            .x(function(d) { return xScale(d.date) })
            .y(function(d) { return yScale(d[chosen]) })

        this.line = this.graph.append("path")
            .datum(this.props.temperatures)
            .attr("fill", "none")
            .attr("stroke", "#534B62")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", this.lineFunc);

        this.circles = this.graph.selectAll("circle")
            .data(this.props.temperatures)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return xScale(d.date) })
            .attr("cy", function(d) { return yScale(d[chosen]) })
            .style("fill", "#1B1725")
        

    }

    renderSpecificGraph(){
        let [xScale, yScale] = this.getScales()
        this.labelAxes(xScale, yScale)
        this.renderLineAndPoints(xScale, yScale)
    }

    updateLineAndCircle(){
        this.line.remove()
        this.circles.remove()
        this.renderSpecificGraph()
    }

    componentDidUpdate({temperatures}, {chosen}){
        if(chosen !== this.state.chosen){
            this.updateLineAndCircle()
        } 

    }


    
    render(){
        return(
            <div id="forecast">
                <button onClick={() => {this.setState({chosen: "tempmin"})}}>Min</button>
                <button onClick={() => {this.setState({chosen: "temp"})}}>Max</button>
                <button onClick={() => {this.setState({chosen: "tempmax"})}}>Average</button>
            </div>
        )
    }
}

export default Forecast