import * as d3 from "d3";
import React from "react";

class WindDirection extends React.Component{
    componentDidMount() {
        this.renderCompass()
    }

    renderCompass(){

        this.w = 100
        this.h = 100
        this.r = 50

        let padding = 15

        this.svg = d3.select("#windDirection")
            .append("svg")
            .attr("viewBox", `0 0 ${this.w} ${this.h}`)

            
        this.svg.append("circle")
            .attr("cx", this.w/2)
            .attr("cy", this.h/2)
            .attr("fill-opacity", 0.1)
            .attr("r", this.r)
            
        this.svg.append("text")
            .attr("x", this.w/2)
            .attr("y", padding)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central") 
            .attr("class", "direction")
            .text("N")
            
        this.svg.append("text")
            .attr("x", this.w - padding)
            .attr("y", this.h /2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("class", "direction")
            .text("E")
            
        this.svg.append("text")
            .attr("x", this.w / 2)
            .attr("y", this.h - padding)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("class", "direction")
            .text("S")
            
        this.svg.append("text")
            .attr("x", padding)
            .attr("y", this.h /2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("class", "direction")
            .text("W")
            
        let arrowPoints = [
                [0, 0],
                [0, 20],
                [20, 10]
            ]
            
        this.arrowHead = this.svg.append("svg:defs")
            .append("marker")
            .attr("id", "arrow")
            .attr("markersUnit", "strokeWidth")
            .attr("markersWidth", 20)
            .attr("markerHeight", 20)
            .attr("viewBox", [0, 0, 20, 20])
            .attr("refX", 10)
            .attr("refY", 10)
            .attr("orient", "auto")
            .append("path")
            .attr("d", d3.line()(arrowPoints))
            .attr("fill", "red")

        this.line = this.svg.append("line")
            .attr("x1", this.w/2)
            .attr("y1", this.h/2)
            .attr("x2", this.w/2)
            .attr("y2", 10)
            .attr("stroke", "red")
            .attr("stroke-width", 4)
            .attr("marker-end", `url(#arrow)`)

        this.animateCompassDirection()
    }

    
    animateCompassDirection(){
        this.line.transition()
          .duration(1500)
            .ease(d3.easeQuadOut)
            .attr("transform", `rotate(${this.props.direction}, ${this.w/2}, ${this.h/2})`)
        
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.direction !== this.props.direction){
            this.animateCompassDirection()
        }
    }

    render(){
        return(
            <div id="windDirection">        
            </div>
        )
    }
}


export default WindDirection