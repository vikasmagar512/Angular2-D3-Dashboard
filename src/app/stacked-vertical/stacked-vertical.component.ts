import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import * as d3 from "d3";

@Component({
  selector: 'app-stacked-vertical',
  templateUrl: './stacked-vertical.component.html',
  styleUrls: ['./stacked-vertical.component.css']
})
export class StackedVerticalComponent implements AfterViewInit {
  activeLabel = {showText:'All',label:'all'}
  configObject = {
    xLabel:'Backlog',
    yLabel:'Sales',
    xValues:['ST522','ST540','ST560'],
    mapping:[{showText:'All',label:'all'},{showText:'Top Customers',label:'top'},{showText:'Will Call',label:'call'},{showText:'Hold',label:'hold'}],
    stackValues:[{
          'top': 359,
          'call': 0,
          'hold': 23
      }, {
          'top': 828,
          'call': 1,
          'hold': 30
      },
      {
          'top': 788,
          'call': 81,
          'hold': 70
      }
    ]
  }
  // salesData = [{
  //   'date': '2017-06-30T18:30:00.000Z',
  //   'top': 359,
  //   'call': 0,
  //   'hold': 23
  //   }, {
  //       'date': '2017-07-31T18:30:00.000Z',
  //       'top': 828,
  //       'call': 1,
  //       'hold': 30
  //   },
  //   {
  //       'date': '2017-08-31T18:30:00.000Z',
  //       'top': 788,
  //       'call': 81,
  //       'hold': 70
  //   }
  // ];
  // labels = [{showText:'All',label:'all'},{showText:'Top Customers',label:'top'},{showText:'Will Call',label:'call'},{showText:'Hold',label:'hold'}];
  labels = [];
  salesData = [];
  
  constructor(private dataService: DataService) { 
    this.salesData = this.configObject.xValues.map((v,i)=>{
      return {
        date:v,
        ...this.configObject.stackValues[i]
      }
    })
    this.labels =this.configObject.mapping
  } 
  selectLabel(lbel){
    this.activeLabel = lbel
    this.plotChart()
  }
  plotChart(){
    let l = this.salesData.map(i=>{
      let obj = {}
      Object.keys(i).map(k=>{
        if(['date',this.activeLabel.label].indexOf(k)!==-1 || this.activeLabel.label==='all'){
          obj[k] = i[k]
        }
      })
      return obj
    })
    this.stackOriginal(l)
  }
  ngAfterViewInit() {
    this.plotChart()
  }
  stackOriginal(salesData){
    //   function createChartLegend(mainDiv, group) {
    //     var z = d3.scaleOrdinal(d3.schemeCategory10);
    //     var mainDivName = mainDiv.substr(1, mainDiv.length);
    //     $(mainDiv).before("<div id='Legend_" + mainDivName + "' class='pmd-card-body' style='margin-top:0; margin-bottom:0;'></div>");
    //     var keys = group;
    //     keys.forEach(function(d) {
    //         var cloloCode = z(d);
    //         $("#Legend_" + mainDivName).append("<span class='team-graph team1' style='display: inline-block; margin-right:10px;'>\
    //         <span style='background:" + cloloCode +
    //             ";width: 10px;height: 10px;display: inline-block;vertical-align: middle;'>&nbsp;</span>\
    //         <span style='padding-top: 0;font-family:Source Sans Pro, sans-serif;font-size: 13px;display: inline;'>" + d +
    //             " </span>\
    //       </span>");
    //     });
    // }
    var group = Object.keys(salesData[0]).filter((k)=>k!=='date')
    // var group = ["top", "call", "hold"];
    var parseDate = d3.timeFormat("%b-%Y");
    var mainDiv = "#f";
    var mainDivName = "charts";
    // createChartLegend(mainDiv, group);
    // var salesData = [{
    //         'date': '2017-06-30T18:30:00.000Z',
    //         'Ram': 359,
    //         'Laptops': 0,
    //         'Processor': 23
    //     }, {
    //         'date': '2017-07-31T18:30:00.000Z',
    //         'Ram': 828,
    //         'Laptops': 1,
    //         'Processor': 30
    //     },
    //     {
    //         'date': '2017-08-31T18:30:00.000Z',
    //         'Ram': 788,
    //         'Laptops': 81,
    //         'Processor': 70
    //     }
    // ];
    salesData.forEach(function(d) {
        d = type(d);
    });
    var layers = d3.stack()
        .keys(group)
        .offset(d3.stackOffsetDiverging)
        (salesData);

    let barchartSvg = d3.select(".barchartPopUpVertical svg");
    let barchartLegend = d3.select(".barchartPopUpVertical .legendVertical");
    if (barchartSvg !== null) {
      barchartSvg.remove();
      if (barchartLegend !== null) {
        barchartLegend.remove();
      }
    }

    let svgs = d3.select(".barchartPopUpVertical").append("svg")
        .attr("width", '550')
        .attr("height", '410')
  
    var svg = d3.select(".barchartPopUpVertical svg"),
        margin = {
            top: 20,
            right: 30,
            bottom: 60,
            left: 60
        },
        width = +svg.attr("width"),
        height = +svg.attr("height");
  
    var x = d3.scaleBand()
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);
  
    x.domain(salesData.map(function(d) {
        return d.date;
    }))
  
    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom, margin.top]);
  
    y.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
  
    function stackMin(layers) {
        return d3.min(layers, function(d) {
            return d[0];
        });
    }
  
    function stackMax(layers) {
        return d3.max(layers, function(d) {
            return d[1];
        });
    }
    svg.append("g")
      .attr("transform", "translate(0," + y(0) + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.bottom * 0.5+10)
      .attr("dx", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text(this.configObject.xLabel);

    // svg.append("g")
    //   .attr("transform", "translate(" + margin.left + ",0)")
    //   .call(d3.axisLeft(y)
    //     .tickSize(-width, 0, 0)
    //     .tickFormat( function(d) { return d } )
    //   )
    //   .append("text")
    //   .attr("transform", "rotate(-90)")
    //   .attr("x", 0 - (height / 2))
    //   .attr("y", 15 - (margin.left))
    //   .attr("dy", "0.32em")
    //   .attr("fill", "#000")
    //   .attr("font-weight", "bold")
    //   .attr("text-anchor", "middle")
    //   .text(this.configObject.yLabel);
    var z = d3.scaleOrdinal(d3.schemeCategory10);
  
    var maing = svg.append("g")
        .selectAll("g")
        .data(layers);
    var g = maing.enter().append("g")
        .attr("fill", function(d) {
            return z(d.key);
        });
  
    var rect = g.selectAll("rect")
        .data(function(d) {
            d.forEach(function(d1) {
                d1.key = d.key;
                return d1;
            });
            return d;
        })
        .enter().append("rect")
        .attr("data", function(d) {
            var data = {};
            data["key"] = d.key;
            data["value"] = d.data[d.key];
            var total = 0;
            group.map(function(d1) {
                total = total + d.data[d1]
            });
            data["total"] = total;
            return JSON.stringify(data);
        })
        .attr("width", x.bandwidth)
        .attr("x", function(d) {
            return x(d.data.date);
        })
        .attr("y", function(d) {
            return y(d[1]);
        })
        .attr("height", function(d) {
            return y(d[0]) - y(d[1]);
        });

    rect.on("mouseover", function() {
        var currentEl = d3.select(this);
        var fadeInSpeed = 120;
        d3.select("#recttooltip_" + mainDivName)
            .transition()
            .duration(fadeInSpeed)
            .style("opacity", function() {
                return 1;
            });
        d3.select("#recttooltip_" + mainDivName).attr("transform", function(d) {
            var mouseCoords = d3.mouse(this.parentNode);
            var xCo = 0;
            if (mouseCoords[0] + 10 >= width * 0.80) {
                xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                    .attr("width"));
            } else {
                xCo = mouseCoords[0] + 10;
            }
            var x = xCo;
            var yCo = 0;
            if (mouseCoords[0] + 10 >= width * 0.80) {
                yCo = mouseCoords[1] + 10;
            } else {
                yCo = mouseCoords[1];
            }
            var x = xCo;
            var y = yCo;
            return "translate(" + x + "," + y + ")";
        });
        //CBT:calculate tooltips text
        var tooltipData = JSON.parse(currentEl.attr("data"));
        var tooltipsText = "";
        d3.selectAll("#recttooltipText_" + mainDivName).text("");
        var yPos = 0;
        d3.selectAll("#recttooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text(tooltipData.key + ":  " + tooltipData.value);
        yPos = yPos + 1;
        d3.selectAll("#recttooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text("Total" + ":  " + tooltipData.total);
        //CBT:calculate width of the text based on characters
        var dims = getDimensions("recttooltipText_" + mainDivName);
        d3.selectAll("#recttooltipText_" + mainDivName + " tspan")
            .attr("x", dims.w + 4);
  
        d3.selectAll("#recttooltipRect_" + mainDivName)
            .attr("width", dims.w + 10)
            .attr("height", dims.h + 20);
        });
    rect.on("mousemove", function() {
        var currentEl = d3.select(this);
        currentEl.attr("r", 7);
        d3.selectAll("#recttooltip_" + mainDivName)
            .attr("transform", function(d) {
                var mouseCoords = d3.mouse(this.parentNode);
                var xCo = 0;
                if (mouseCoords[0] + 10 >= width * 0.80) {
                    xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                        .attr("width"));
                } else {
                    xCo = mouseCoords[0] + 10;
                }
                var x = xCo;
                var yCo = 0;
                if (mouseCoords[0] + 10 >= width * 0.80) {
                    yCo = mouseCoords[1] + 10;
                } else {
                    yCo = mouseCoords[1];
                }
                var x = xCo;
                var y = yCo;
                return "translate(" + x + "," + y + ")";
            });
    });
    rect.on("mouseout", function() {
        var currentEl = d3.select(this);
        d3.select("#recttooltip_" + mainDivName)
            .style("opacity", function() {
                return 0;
            })
            .attr("transform", function(d, i) {
                // klutzy, but it accounts for tooltip padding which could push it onscreen
                var x = -500;
                var y = -500;
                return "translate(" + x + "," + y + ")";
            });
    });
  

  
    var rectTooltipg = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .attr("id", "recttooltip_" + mainDivName)
        .attr("style", "opacity:0")
        .attr("transform", "translate(-500,-500)");
  
    rectTooltipg.append("rect")
        .attr("id", "recttooltipRect_" + mainDivName)
        .attr("x", 0)
        .attr("width", 120)
        .attr("height", 80)
        .attr("opacity", 0.71)
        .style("fill", "#000000");
  
    rectTooltipg
        .append("text")
        .attr("id", "recttooltipText_" + mainDivName)
        .attr("x", 30)
        .attr("y", 15)
        .attr("fill", function() {
            return "#fff"
        })
        .style("font-size", function(d) {
            return 10;
        })
        .style("font-family", function(d) {
            return "arial";
        })
        .text(function(d, i) {
            return "";
        });

    d3.selectAll(".domain").attr("display", "none");
    d3.selectAll(".tick line").attr("stroke", "#C0C0BB");
    d3.selectAll(".tick text")
    .attr("fill", "#8E8883")
    .attr("font-size", "14pt")
    .attr("font-family", "#sans-serif");
  
    function type(d) {
        // d.date = parseDate(new Date(d.date));
        d.date = d.date;
        group.forEach(function(c) {
            d[c] = +d[c];
        });
        return d;
    }

    function getDimensions(id) {
      // alert('getDimensions')
      var el = document.getElementById(id);
      var w = 0,
        h = 0;
      if (el) {
        var dimensions = (el as any).getBBox()
        w = dimensions.width;
        h = dimensions.height;
      } else {
        console.log("error: getDimensions() " + id + " not found.");
      }
      return {
        w: w,
        h: h
      };
    }
  }
}
