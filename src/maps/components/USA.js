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
                .attr("class", this.slugName)
                .style("fill", "none")
                .style("stroke", "black")

    }

    slugName(d){
        let slug = d.properties.NAME.toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'_')
        return `state-${slug}`
    }

    render(){
        return <div id="USA"></div>
    }
    
}

export default USA;