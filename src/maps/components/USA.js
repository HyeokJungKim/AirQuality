import * as d3 from "d3";
import React from "react";
import geoJSON from '../geojson'

class USA extends React.Component{
    
    componentDidMount() {
        this.renderMap()
    }

    renderMap(){
        let w = 750
        let h = 750

        let svg = d3.select("#USA").append("svg")
            .attr("width", w)
            .attr("height", h)

        let g = svg.append("g")

        let projection = d3.geoAlbersUsa()
            .scale(1000)
            .translate([w/2, h/2])

        let path = d3.geoPath()
            .projection(projection)

        g.selectAll("path")
            .data(geoJSON.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "state")
            .style("fill-opacity", 0)
            .style("stroke", "black")
            
        g.on("click", (e) => {
            this.handleClickOnState(e, projection)
        })

        g.on("mouseover", (e) => {
            this.handleHoverOnState(e, projection, svg, path)
        })

        g.on("mouseout" , (e) => {
           
        })


    }

    handleClickOnState(e, projection){
        let stateName = e.target.__data__.properties.NAME
        let [lng, lat] = projection.invert(d3.pointer(e))
    }

    handleHoverOnState(e, projection, svg, path){
        let stateName = e.target.__data__.properties.NAME
        svg.append("text")
            .attr("transform", function(d){
                let mapCenter = path.centroid(e.target.__data__.geometry)
                return `translate(${mapCenter})`
            })
            .text(stateName)

        console.log(stateName);
    }

    render(){
        return <div id="USA"></div>
    }
    
}

export default USA;