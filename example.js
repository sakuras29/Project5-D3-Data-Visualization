
// function main(){
//     alert("Hello!")

//     d3.select("h1").style("color","green")
//     d3.select("p").style("color","firebrick")

//     var svg = d3.select("svg"),
//     margin = 200,
//     width = svg.attr("width") - margin,
//     height = svg.attr("height") -margin;

//     svg.append("text")
//         // .attr("transform", "translate(100,0)")
//         .attr("transform", "rotate(-90)")
//         .attr("x", -150)
//         .attr("y", 50)
//         // .attr("dy", "-5em")
//         .attr("text-anchor","End")
//         .attr("stroke","black")
//         .attr("font-size", "12px")
//         .text("Power Usage Effectiveness");

//     var xScale = d3.scaleBand().range([0,width]).padding(0.4),
//         yScale = d3.scaleLinear().range([height,0]);

//     var g = svg.append("g").attr("transform", "translate("+100+","+50+")");

//     d3.csv("./data/PUE.csv").then(function(data){

//         xScale.domain(data.map(function(d){return d.ID;}))
//         yScale.domain([0,d3.max(data, function(d){return d.PUE})])

//         g.append("g").attr("transform","translate(0,"+height+")").call(d3.axisBottom(xScale))
//         g.append("g").call(d3.axisLeft(yScale).tickFormat(function(d) {return d;}).ticks(10))

//         g.selectAll(".bar").data(data)
//         .enter().append("rect")
//         .attr("class","bar")
//         .on("mouseover", onMouseOver)
//         .on("mouseout", onMouseOut)
//         .attr("x",function(d) {return xScale(d.ID);})
//         .attr("y",function(d) {return yScale(d.PUE);})
//         .attr("width",xScale.bandwidth())
//         .transition()
//         .ease(d3.easeLinear)
//         .duration(500)
//         .delay(function(d,i){ return i*10})
//         .attr("height", function(d) {return height - yScale(d.PUE);});

//     });

//     function onMouseOver(d,i){
//         var xPos = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth()/2;
//         var yPos = parseFloat(d3.select(this).attr("y"))/2 + height/3;

//         d3.select("#tooltip")
//             .style("left", xPos + "px")
//             .style("top", yPos + "px")
//             .select("#value").text(i.PUE)

//         d3.select("#tooltip").classed("hidden", false);

//         d3.select(this).attr("class","highlight")
//         d3.select(this)
//             .transition()
//             .duration(500)
//             .attr("width", xScale.bandwidth()+5)
//             .attr("y", function(d){return yScale(d.PUE)-5;})
//             .attr("height", function(d){return height - yScale(d.PUE)+5;})
//             .attr("x", function(d){return xScale(d.ID)-2.5;});
//     }

//     function onMouseOut(d,i){
//         d3.select(this).attr("class","bar")
//         d3.select(this)
//             .transition()
//             .duration(500)
//             .attr("width", xScale.bandwidth())
//             .attr("y", function(d){return yScale(d.PUE);})
//             .attr("height", function(d){return height - yScale(d.PUE);})
//             .attr("x", function(d){return xScale(d.ID);});

//             d3.select("#tooltip").classed("hidden", true);

//         }
   
// }


// /*---------------------
// // D3.js Gauge Chart //
// ---------------------*/
// // Data which need to be fetched
// var name = "Server Response";
// var value = 75;    // My Desired Value To Show
// var gaugeMaxValue = 100;

// // Data of calculation
// var percentValue = value / gaugeMaxValue;
// var needleClient;
// (function () {
// 	var barWidth, chart, chartInset, degToRad, repaintGauge, height, margin, numSections, padRad, percToDeg, percToRad, percent, radius, sectionIndx, svg, totalPercent, width, recalcPointerPos;

// 	percent = percentValue;

// 	numSections = 1;
// 	sectionPerc = 1 / numSections / 2;
// 	padRad = 0.025;
// 	chartInset = 10;

// 	// Orientation of Gauge:
// 	totalPercent = .75;

// 	el = d3.select('.chart-gauge');

// 	margin = {
// 		top: 20,
// 		right: 20,
// 		bottom: 20,
// 		left: 20
// 	};

// 	width = el[0][0].offsetWidth - margin.left - margin.right;
// 	height = width;
// 	radius = Math.min(width, height) / 2;
// 	barWidth = 40 * width / 300;

// 	// Utility methods 
// 	percToDeg = function (perc) {
// 		return perc * 360;
// 	};

// 	percToRad = function (perc) {
// 		return degToRad(percToDeg(perc));
// 	};

// 	degToRad = function (deg) {
// 		return deg * Math.PI / 180;
// 	};

// 	// Create SVG element
// 	svg = el.append('svg').attr('width', width + margin.left + margin.right).attr('height', height / 1.5 + margin.top + margin.bottom);		// height/1.5 To Remove Extra Bottom Space

// 	// Add layer for the panel
// 	chart = svg.append('g').attr('transform', "translate(" + ((width + margin.left) / 2) + ", " + ((height + margin.top) / 2) + ")");

// 	chart.append('path').attr('class', "arc chart-first");
// 	chart.append('path').attr('class', "arc chart-second");
// 	chart.append('path').attr('class', "arc chart-third");

// 	arc3 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)
// 	arc2 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)
// 	arc1 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)

// 	repaintGauge = function () {
// 		perc = 0.5;
// 		var next_start = totalPercent;
// 		arcStartRad = percToRad(next_start);
// 		arcEndRad = arcStartRad + percToRad(perc / 3);
// 		next_start += perc / 3;

// 		arc1.startAngle(arcStartRad).endAngle(arcEndRad);

// 		arcStartRad = percToRad(next_start);
// 		arcEndRad = arcStartRad + percToRad(perc / 3);
// 		next_start += perc / 3;

// 		arc2.startAngle(arcStartRad + padRad).endAngle(arcEndRad);

// 		arcStartRad = percToRad(next_start);
// 		arcEndRad = arcStartRad + percToRad(perc / 3);

// 		arc3.startAngle(arcStartRad + padRad).endAngle(arcEndRad);

// 		chart.select(".chart-first").attr('d', arc1);
// 		chart.select(".chart-second").attr('d', arc2);
// 		chart.select(".chart-third").attr('d', arc3);
// 	}	
	
// 	var Needle = (function () {

// 		//Helper function that returns the `d` value for moving the needle
// 		var recalcPointerPos = function (perc) {
// 			var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
// 			thetaRad = percToRad(perc / 2);
// 			centerX = 0;
// 			centerY = 0;
// 			topX = centerX - this.len * Math.cos(thetaRad);
// 			topY = centerY - this.len * Math.sin(thetaRad);
// 			leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
// 			leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
// 			rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
// 			rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
// 			return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;
// 		};

// 		function Needle(el) {
// 			this.el = el;
// 			this.len = width / 2.5;
// 			this.radius = this.len / 8;
// 		}

// 		Needle.prototype.render = function () {
// 			this.el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
// 			return this.el.append('path').attr('class', 'needle').attr('id', 'client-needle').attr('d', recalcPointerPos.call(this, 0));
// 		};

// 		Needle.prototype.moveTo = function (perc) {
// 			var self,
// 				oldValue = this.perc || 0;
// 			this.perc = perc;
// 			self = this;

// 			// Reset pointer position
// 			this.el.transition().delay(100).ease('quad').duration(200).select('.needle').tween('reset-progress', function () {
// 				return function (percentOfPercent) {
// 					var progress = (1 - percentOfPercent) * oldValue;
// 					repaintGauge(progress);
// 					return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
// 				};
// 			});

// 			this.el.transition().delay(300).ease('bounce').duration(1500).select('.needle').tween('progress', function () {
// 				return function (percentOfPercent) {
// 					var progress = percentOfPercent * perc;

// 					repaintGauge(progress);
// 					return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
// 				};
// 			});

// 		};

// 		return Needle;

// 	})();

// 	var dataset = [{
// 		metric: name,
// 		value: value
// 	}]

// 	var texts = svg.selectAll("text")
// 		.data(dataset)
// 		.enter();

// 	texts.append("text")
// 		.text(function () {
// 			return dataset[0].metric;
// 		})
// 		.attr('id', "Name")
// 		.attr('transform', "translate(" + ((width + margin.left) / 6) + ", " + ((height + margin.top) / 1.5) + ")")
// 		.attr("font-size", 25)
// 		.style("fill", "#000000");


// 	var trX = 180 - 210 * Math.cos(percToRad(percent / 2));
// 	var trY = 195 - 210 * Math.sin(percToRad(percent / 2));
// 	// (180, 195) are the coordinates of the center of the gauge.

// 	displayValue = function () {
// 		texts.append("text")
// 			.text(function () {
// 				return dataset[0].value;
// 			})
// 			.attr('id', "Value")
// 			.attr('transform', "translate(" + trX + ", " + trY + ")")
// 			.attr("font-size", 18)
// 			.style("fill", '#000000');
// 	}

// 	texts.append("text")
// 		.text(function () {
// 			return 0;
// 		})
// 		.attr('id', 'scale0')
// 		.attr('transform', "translate(" + ((width + margin.left) / 100) + ", " + ((height + margin.top) / 2) + ")")
// 		.attr("font-size", 15)
// 		.style("fill", "#000000");

// 	texts.append("text")
// 		.text(function () {
// 			return gaugeMaxValue / 2;
// 		})
// 		.attr('id', 'scale10')
// 		.attr('transform', "translate(" + ((width + margin.left) / 2.15) + ", " + ((height + margin.top) / 30) + ")")
// 		.attr("font-size", 15)
// 		.style("fill", "#000000");


// 	texts.append("text")
// 		.text(function () {
// 			return gaugeMaxValue;
// 		})
// 		.attr('id', 'scale20')
// 		.attr('transform', "translate(" + ((width + margin.left) / 1.03) + ", " + ((height + margin.top) / 2) + ")")
// 		.attr("font-size", 15)
// 		.style("fill", "#000000");

// 	needle = new Needle(chart);
// 	needle.render();
// 	needle.moveTo(percent);

// 	setTimeout(displayValue, 1350);

// })();

