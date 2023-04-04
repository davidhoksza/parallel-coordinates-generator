function renderData(svg, data, params, colClass='group'){
    
    // let classes = Array.from(new Set(data.map(x=>x[colClass])));
    // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
    //dimensions = Object.keys(data[0]).filter(function(d) { return d != "Species" })
    let dimensions = Object.keys(data[0]).slice(2);
    
    // console.log(dimensions);
    // console.log(classes);        
    // var colorScale = d3.scalePoint().domain(classes)
    // var color = classes.length > 10 ? d => d3.interpolateSpectral(colorScale(d[colClass])) : d => d3.scaleOrdinal().domain(classes).range(d3.schemeTableau10)(d);

    //console.log(classes[0], color(classes[0]))
    // For each dimension, I build a linear scale. I store all in a y object
    var y = {}        
    for (const name of dimensions) {            
        y[name] = d3.scaleLinear()                
            .domain( d3.extent(data, function(d) { return parseFloat(d[name]); }) )
            .range([params.dims.height, 0])
    }

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
        .range([0, params.dims.width])
        .padding(1)
        .domain(dimensions);

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
        return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    // Draw the lines
    svg
        .selectAll("myPath")
        .data(data)
        .enter()
            .append("path")
                .attr("d",  path)
                .style("fill", "none")
                //.style("stroke", d => color(d))
                .style("stroke", d3.rgb(...params.style.color))
                .style("stroke-width", params.style.strokeWidth)
                .style("opacity", params.style.opacity)

    // Draw the axis:
    if (params.axis) {
        svg.selectAll("myAxis")        
            .data(dimensions).enter()
            .append("g")
            // I translate this element to its right position on the x axis
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
            // And I build the axis with the call function
            .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
            // Add axis title
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d) { return d; })
            .style("fill", "black")

        //})
    }

}

function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    document.createElement("div");
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.id = "download"
    downloadLink.innerHTML  = "download"
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    //document.body.removeChild(downloadLink);    
}