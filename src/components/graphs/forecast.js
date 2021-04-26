import React from "react"
import * as d3 from "d3"

class Forecast extends React.Component{

    state = {
        chosen: "temp",
        color: "green"
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

        this.graph = svg.append("g")
            .attr("transform", `translate(${this.margin}, ${this.margin})`)
   
        this.xAxis = this.graph.append("g")
            .attr("transform", `translate(0, ${this.height})`)
        this.yAxis = this.graph.append("g")

        this.xBar = this.graph.append("line")
            .style("stroke", "black")
            .style("stroke-dasharray", [3,3])
            
        this.yBar = this.graph.append("line")
           .style("stroke", "black")
            .style("stroke-dasharray", [3,3])

        let degreeF = '\xB0F'

        svg.append("text")
            .attr("x", -(this.height/2) - this.margin)
            .attr("y", this.margin / 2.4 )
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .text(`Degrees ${degreeF}`)

        svg.append("text")
            .attr('x', this.width / 2 + this.margin)
            .attr('y', this.h - 15)
            .attr('text-anchor', 'middle')
            .text('Days')

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
        let {chosen, color} = this.state

        this.lineFunc = d3.line()
            .x(function(d) { return xScale(d.date) })
            .y(function(d) { return yScale(d[chosen]) })

        this.line = this.graph.append("path")
            .datum(this.props.temperatures)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .style("opacity", 0)
            .attr("d", this.lineFunc)
            
        this.line.transition()
            .delay(this.props.temperatures.length * 100)
            .style("opacity", 1)
            
        this.circles = this.graph.selectAll("circle")
            .data(this.props.temperatures)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { return xScale(d.date) })
            .attr("cy", function(d) { return yScale(d[chosen]) })
            .style("opacity", 0)
            .style("fill", "#1B1725")
            .style("cursor", "pointer")
            .on("mouseover", (evt, d) => {
                this.props.setHoveredDate(d.date)
                this.xBar
                    .attr("x1", xScale(d.date))
                    .attr("y1", this.height)
                    .attr("x2", xScale(d.date))
                    .attr("y2", 0)

                this.yBar
                    .attr("x1", 0)
                    .attr("y1", yScale(d[chosen]))
                    .attr("x2", this.width)
                    .attr("y2", yScale(d[chosen]))
            })
            .on("mouseout", (evt, d) => {
                this.props.setHoveredDate("")
                this.xBar
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", 0)
                    .attr("y2", 0)

                this.yBar
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", 0)
                    .attr("y2", 0)
            })
            
        this.circles.transition()
            .delay(function(d, i) {
                return i * 100
            })
            .style("opacity", 1);
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

        if(JSON.stringify(temperatures) !== JSON.stringify(this.props.temperatures)){
            this.updateLineAndCircle()
        }

    }

    render(){
        return(
            <div id="forecast">
                <h2 className="name">{this.props.cityName}, {this.props.stateName}</h2>
                <button className="min line" onClick={() => {this.setState({chosen: "tempmin", color: "red"})}}>Minimum</button>
                <button className="avg line" onClick={() => {this.setState({chosen: "temp", color: "green"})}}>Average</button>
                <button className="max line" onClick={() => {this.setState({chosen: "tempmax", color: "blue"})}}>Maximum</button>
            </div>
        )
    }
}

export default Forecast