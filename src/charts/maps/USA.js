import * as d3 from "d3";
import React from "react";
import geoJSON from '../../assets/geojson'
import {getCityData} from '../../adapters/airquality'

class USA extends React.Component{
    
    componentDidMount() {
        this.renderMap()
    }

    renderMap(){
        let w = 750
        let h = 500

        let svg = d3.select("#USA").append("svg")
            .attr("viewBox", `0 0 ${w} ${h}`)

        let g = svg.append("g")

        let projection = d3.geoAlbersUsa()
            .scale(1000)
            .translate([w/2, h/2])

        let path = d3.geoPath()
            .projection(projection)

        let marker = g.append("text")
            .attr("id", "marker")
            .style("opacity", 0)

        let starData = d3.symbol()
            .type(d3.symbolStar)
            .size(50)

        this.star = g.append("path")
            .attr("d", starData)
            .attr("id", "star")
            .attr("opacity", 0)

        g.selectAll("path")
            .data(geoJSON.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("class", "state")
            .style("fill-opacity", 0.1)
            .style("stroke", "#534B62")
            .on("click", (e) => {
                this.handleClickOnState(e, projection)
            })
            
            svg.on("mouseover", (e) => { 
                if(e.target.tagName === "path"){
                    this.handleHoverOnState(e, marker, path)
                } 
            })  
            .on("mouseout", (e) => {
                if(!e.relatedTarget ||  e.relatedTarget.tagName !== "text"  ){
                    marker.transition()
                        .duration(500)	
                        .text("")
                        .style("opacity", 0)
                }
            })

    }

    handleClickOnState(e, projection){
        let [x,y] = d3.pointer(e)
        let [lng, lat] = projection.invert(d3.pointer(e))

        this.star
            .attr("transform", `translate(${x}, ${y})`)
            .attr("opacity", 0.9)
        // getCityData(lat, lng)
        //     .then(city => {
        //         this.props.setCityData(city.data)
        //     })


    }



    handleHoverOnState(e, marker, path){

        let stateName = e.target.__data__.properties.NAME

        marker.transition()
            .duration(200)
            .attr("transform", function(d){
                let mapCenter = path.centroid(e.target.__data__.geometry)
                mapCenter[0] -= 25
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