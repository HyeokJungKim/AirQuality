import * as d3 from "d3";
import React from "react";

class WindDirection extends React.Component{
    componentDidMount() {
        this.renderCompass()
    }

    renderCompass(){

        this.w = 100
        this.h = 100

        this.svg = d3.select("#windDirection")
            .append("svg")
            .attr("width", this.w)
            .attr("height", this.h)

        // DEBUG: Make it into arrow
        this.line = this.svg.append("line")
            .attr("x1", this.w/2)
            .attr("y1", this.h/2)
            .attr("x2", this.w/2)
            .attr("y2", 0)
            .attr("stroke", "red")
            .attr("stroke-width", 2)

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