import * as d3 from "d3";
import React from "react";
import geoJSON from './geojson'
import {getCityData} from '../../adapters/airquality'

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

        let div = svg.append("text")
            .attr("id", "marker")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("z-index", -10)

        g.selectAll("path")
            .data(geoJSON.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "state")
            .style("fill-opacity", 0)
            .style("stroke", "black")
            .on("click", (e) => {
                this.handleClickOnState(e, projection)
            })
            .on("mouseover", (e) => { 
                this.handleHoverOnState(e, div, path)
             })  

        d3.select("#USA").on("mouseout", (e) => {
            div.transition()
                .duration(2000)	
                .text("")
                .style("opacity", 0)
        })

    }

    handleClickOnState(e, projection){
        let [lng, lat] = projection.invert(d3.pointer(e))

        // getCityData(lat, lng)
            // .then(console.log)
    }



    handleHoverOnState(e, div, path){
        // DEBUG: Hovering over text gets glitchy
        let stateName = e.target.__data__.properties.NAME

        div.transition()
            .duration(200)
            .attr("transform", function(d){
                let mapCenter = path.centroid(e.target.__data__.geometry)
                return `translate(${mapCenter})`
            })
            .style("opacity", 0.9)
            .text(stateName)

    }

    render(){
        return <div id="USA"></div>
    }
    
}

export default USA;