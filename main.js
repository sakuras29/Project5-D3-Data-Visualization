import * as d3 from "d3";

function drawGauge(selector, value, title) {
    const width = 200;
    const height = 200;
    const innerRadius = 60;
    const outerRadius = 80;

    const scale = d3.scaleLinear()
        .domain([0, 100])
        .range([-Math.PI / 2, Math.PI / 2]);

    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(-Math.PI / 2);

    // Clear existing SVG
    d3.select(selector).select("svg").remove();

    const svg = d3.select(selector)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#f9f9f9");

    const group = svg.append("g")
        .attr("transform", `translate(${width / 2},${height / 1.5})`);

    // Background arc
    group.append("path")
        .datum({ endAngle: Math.PI / 2 })
        .attr("d", arc)
        .attr("fill", "#ddd");

    // Determine the color based on the value
    let arcColor;
    if (value <= 33) {
        arcColor = "red"; // Low value
    } else if (value <= 66) {
        arcColor = "yellow"; // Medium value
    } else {
        arcColor = "green"; // High value
    }

    // Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "18px")
        .attr("fill", "#444")
        .text(title);

    // Outer arcs (red, yellow, green ranges)
    const outerArc = d3.arc()
        .innerRadius(outerRadius + 3)  // Adjust thickness of outer arcs
        .outerRadius(outerRadius + 8)
        .startAngle(-Math.PI/2)
        // .endAngle(0);

    // Red arc (Low range)
    group.append("path")
        .datum({ endAngle: (Math.PI/3)-(Math.PI/2) })
        .attr("d", outerArc)
        .attr("fill", "red");

    // Yellow arc (Medium range)
    outerArc.startAngle((Math.PI/3)-(Math.PI/2)); // Start angle for yellow
    group.append("path")
        .datum({ endAngle: Math.PI/6 })
        .attr("d", outerArc)
        .attr("fill", "yellow");

    // Green arc (High range)
    outerArc.startAngle(Math.PI/6); // Start angle for green
    group.append("path")
        .datum({ endAngle: Math.PI/2 })
        .attr("d", outerArc)
        .attr("fill", "green");

    // Foreground arc (dynamic value color)
    // const foreground = group.append("path")
    //     .datum({ endAngle: scale(0) })
    //     .attr("d", arc)
    //     .attr("fill", "gray");

    // Foreground arc
    // const foreground = group.append("path")
    //     .datum({ endAngle: scale(Math.PI / 2) })
    //     .attr("d", arc)
    //     .attr("fill", "#00bfff");

    // Foreground arc (dynamic color)
    const foreground = group.append("path")
        .datum({ endAngle: scale(0) })
        .attr("d", arc)
        .attr("fill", arcColor);

    // Label
    const label = svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("fill", "#333")
        .text("0%");

    // Animate to target value
    const newAngle = scale(value);

    foreground.transition()
        .duration(1000)
        .attrTween("d", function (d) {
            const interpolate = d3.interpolate(d.endAngle, newAngle);
            return function (t) {
                d.endAngle = interpolate(t);
                return arc(d);
            };
        });

    label.transition()
        .duration(1000)
        .tween("text", function () {
            const that = d3.select(this);
            const i = d3.interpolateNumber(0, value);
            return function (t) {
                that.text(Math.round(i(t)) + "%");
            };
        });
}

// Call the function for multiple gauges
drawGauge("#gauge1", 35, "CPU Usage");
drawGauge("#gauge2", 70, "Memory Usage");
drawGauge("#gauge3", 90, "Disk Usage");
setTimeout(() => drawGauge("#gauge3", 10, "Disk Usage 2"), 2000); // Update after 2 seconds









// function drawGauge(value) {
//     const width = 200;
//     const height = 200;

//     // Remove any existing gauge (for updates)
//     d3.select("#gauge").select("svg").remove();

//     const svg = d3.select("#gauge")
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .style("border", "1px solid #999");  // <-- add this line

//     svg.append("rect")
//         .attr("width", width)
//         .attr("height", height)
//         .attr("fill", "#f0f8ff");

//     // Scale for the angle
//     const scale = d3.scaleLinear()
//         .domain([0, 100])
//         .range([-Math.PI / 2, Math.PI / 2]);

//     const arc = d3.arc()
//         .innerRadius(60)
//         .outerRadius(80)
//         .startAngle(-Math.PI / 2)
//         .endAngle(scale(value));

//     svg.append("g")
//         .attr("transform", `translate(${width / 2},${height / 2})`)
//         .append("path")
//         .attr("d", arc)
//         .attr("fill", "#00bfff");

//     // Add background arc
//     const backgroundArc = d3.arc()
//         .innerRadius(60)
//         .outerRadius(80)
//         .startAngle(scale(value))
//         .endAngle(Math.PI / 2);

//     svg.select("g")
//         .append("path")
//         .attr("d", backgroundArc)
//         .attr("fill", "#ddd");

//     // Add text
//     svg.append("text")
//         .attr("x", width / 2)
//         .attr("y", height / 2)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "20px")
//         .attr("fill", "#333")
//         .text(`${value}%`);

// }

// // Example usage:
// drawGauge(65); // Initial
// setTimeout(() => drawGauge(85), 2000); // Update after 2 seconds






// var svg = d3.select("svg")
//     .append("g")
//     .attr("transform", "translate(200,200)");

// var arc = d3.arc()
//     .innerRadius(50)
//     .outerRadius(100)
//     .startAngle(0)
//     .endAngle(Math.PI / 2);

// svg.append("path")
//     .attr("class", "arc")
//     .attr("d", arc)
//     .attr("fill", "green");



// svg.append("path")
//     .attr("transform", "translate(100,100)")
//     .attr("d", d3.arc()({
//         innerRadius: 100,
//         outerRadius: 200,
//         startAngle: -Math.PI / 2,
//         endAngle: Math.PI / 2
//     }));

// const arc = d3.arc()
//     .innerRadius(0)
//     .outerRadius(100)
//     .startAngle(0)
//     .endAngle(Math.PI / 2);


// ----------

// const svg = d3.select("#gauge"),
//       width = +svg.attr("width"),
//       height = +svg.attr("height"),
//       radius = Math.min(width, height * 2) / 2;

// const centerX = width / 2;
// const centerY = height;

// const arc = d3.arc()
//     .innerRadius(radius - 20)
//     .outerRadius(radius)
//     .startAngle(-Math.PI / 2);

// svg.append("path")
//     .datum({endAngle: Math.PI / 2})
//     .style("fill", "#ddd")
//     .attr("d", arc)
//     .attr("transform", `translate(${centerX}, ${centerY})`);

// const needle = svg.append("line")
//     .attr("x1", centerX)
//     .attr("y1", centerY)
//     .attr("x2", centerX)
//     .attr("y2", centerY - radius + 10)
//     .attr("stroke", "red")
//     .attr("stroke-width", 3)
//     .attr("stroke-linecap", "round")
//     .attr("transform", `rotate(${-90}, ${centerX}, ${centerY})`);

// svg.append("circle")
//     .attr("cx", centerX)
//     .attr("cy", centerY)
//     .attr("r", 5)
//     .attr("fill", "black");

// function updateNeedle(value) {
//   const angle = -90 + value * 180;  // convert 0–1 to -90° to 90°
//   needle.transition()
//     .duration(1000)
//     .attr("transform", `rotate(${angle}, ${centerX}, ${centerY})`);
// }

// // Example: move needle to 65%
// updateNeedle(0.95);
