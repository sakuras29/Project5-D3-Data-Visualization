

function main(){
    alert("Hello!")

    d3.select("h1").style("color","green")
    d3.select("p").style("color","firebrick")

    var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") -margin;

    svg.append("text")
        // .attr("transform", "translate(100,0)")
        .attr("transform", "rotate(-90)")
        .attr("x", -150)
        .attr("y", 50)
        // .attr("dy", "-5em")
        .attr("text-anchor","End")
        .attr("stroke","black")
        .attr("font-size", "12px")
        .text("Power Usage Effectiveness");

    var xScale = d3.scaleBand().range([0,width]).padding(0.4),
        yScale = d3.scaleLinear().range([height,0]);

    var g = svg.append("g").attr("transform", "translate("+100+","+50+")");

    d3.csv("./data/PUE.csv").then(function(data){

        xScale.domain(data.map(function(d){return d.ID;}))
        yScale.domain([0,d3.max(data, function(d){return d.PUE})])

        g.append("g").attr("transform","translate(0,"+height+")").call(d3.axisBottom(xScale))
        g.append("g").call(d3.axisLeft(yScale).tickFormat(function(d) {return d;}).ticks(10))

        g.selectAll(".bar").data(data)
        .enter().append("rect")
        .attr("class","bar")
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .attr("x",function(d) {return xScale(d.ID);})
        .attr("y",function(d) {return yScale(d.PUE);})
        .attr("width",xScale.bandwidth())
        .transition()
        .ease(d3.easeLinear)
        .duration(500)
        .delay(function(d,i){ return i*10})
        .attr("height", function(d) {return height - yScale(d.PUE);});

    });

    function onMouseOver(d,i){
        var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth()/2;
        var yPos = parseFloat(d3.select(this).attr("y"))/2 + height/3;

        d3.select("#tooltip")
            .style("left", xPos + "px")
            .style("top", yPos + "px")
            .select("#value").text(i.PUE)

        d3.select("#tooltip").classed("hidden", false);

        d3.select(this).attr("class","highlight")
        d3.select(this)
            .transition()
            .duration(500)
            .attr("width", xScale.bandwidth()+5)
            .attr("y", function(d){return yScale(d.PUE)-5;})
            .attr("height", function(d){return height - yScale(d.PUE)+5;})
            .attr("x", function(d){return xScale(d.ID)-2.5;});
    }

    function onMouseOut(d,i){
        d3.select(this).attr("class","bar")
        d3.select(this)
            .transition()
            .duration(500)
            .attr("width", xScale.bandwidth())
            .attr("y", function(d){return yScale(d.PUE);})
            .attr("height", function(d){return height - yScale(d.PUE);})
            .attr("x", function(d){return xScale(d.ID);});

            d3.select("#tooltip").classed("hidden", true);

        }
   
}
