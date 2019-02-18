import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-horizontal-stacked-bar-chart',
  templateUrl: './horizontal-stacked-bar-chart.component.html',
  styleUrls: ['./horizontal-stacked-bar-chart.component.css']
})
export class HorizontalStackedBarChartComponent implements AfterViewInit {
  @Input() salesData;
  @ViewChild('horizontalStackedChart') chart: ElementRef;
  
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.stackedBarChartHorizontal(this.salesData)    
  }

  stackedBarChartHorizontal(salesData) {
   var group = ["working", "not_working", "service_required"];
    var parseDate = d3.timeFormat("%b-%Y");
    var mainDiv = ".barchartHorizontal";
    var mainDivName = "charts";
    // createChartLegend(mainDiv, group);
    // var salesData = data
    // var salesData = [{
    //   "asset_type": "Coffee",
    //   "working": 20,
    //   "not_working": 40,
    //   "service_required": 60,
    // },
    // // {
    // //   "asset_type": "Printer",
    // //   "working": 20,
    // //   "not_working": 31,
    // //   "service_required": 30,
    // // },
    // // {
    // //   'asset_type': 'Mobile',
    // //   'working': 60,
    // //   'not_working': 20,
    // //   'service_required': 70
    // // },
    // ];
    let j = salesData
    let max = 0;
    j.map(item => {
       let lmax = item['working'] + item['not_working'] + item['service_required']
      // alert(lmax)
      max = max < lmax ? lmax : max
    })
    // alert(max)
    salesData.forEach(function (d) {
      d = type(d);
    });
    var layers = d3.stack()
      .keys(group)
      .offset(d3.stackOffsetDiverging)
      (salesData);

    let barchartSvg = d3.select(".barchartHorizontal svg");
    let barchartLegend = d3.select(".barchartHorizontal .legend");
    if (barchartSvg !== null) {
      barchartSvg.remove();
      if (barchartLegend !== null) {
        barchartLegend.remove();
      }
    }
    /******Hard Coded Div implementation */
    // let svgs = d3.select(".barchartHorizontal").append("svg")
    //   .attr("width", '200')
    //   .attr("height", '80')

    // var svg = d3.select(".barchartHorizontal svg"),
    //   margin = {
    //     top: 20,
    //     right: 30,
    //     bottom: 60,
    //     left: 60
    //   },
    //   width = +svg.attr("width"),
    //   height = +svg.attr("height");
    /************* */
    
    /******nativeElement implementation */
    
    // Specify the chart area and dimensions
    const svg = d3.select(this.chart.nativeElement)
    .attr('width',180)
    .attr('height', 30)
    .attr('x', 0)
    .attr('y', 0)
    ;
    const width = 180;
    const height = 50;
    /************* */
  


    var x = d3.scaleLinear()
      .rangeRound([0, width])
    // .padding(0.1);

    x.domain([0, d3.max(layers[layers.length - 1], function (d) { return d[0] + d[1]; })]).nice();

    var y = d3.scaleBand()
      .rangeRound([height - 20, 0])
      // .padding(0.1)

    y.domain(salesData.map(function (d) {
      return d.asset_type;
    }))

    function stackMin(layers) {
      return d3.min(layers, function (d) {
        return d[0];
      });
    }

    function stackMax(layers) {

      let k = d3.max(layers, function (d) {
        return d[1];
      });
      return k
    }

    var z = d3.scaleOrdinal(d3.schemeCategory10);

    var maing = svg.append("g")
      .attr("transform", "translate(" + 30 + "," + 0 + ")")
      .selectAll("g")
      .data(layers);
    var g = maing.enter().append("g")
      .attr("fill", function (d) {
        return z(d.key);
      });

    var totalRectange = g.selectAll("rect")
      .data(function (d) {
        d.forEach(function (d1) {
          d1.key = d.key;
          return d1;
        });
        return d;
      })
      .enter().append('g')
    totalRectange.append("rect")
      .attr("data", function (d) {
        var data = {};
        if (d.key === 'working') {
          data["key"] = "Working";
        } else if (d.key === 'not_working') {
          data["key"] = "Not Working";
        } else if (d.key === 'service_required') {
          data["key"] = "Service Req";
        }
        // data["key"] = d.key;
        data["value"] = d.data[d.key];
        var total = 0;
        group.map(function (d1) {
          total = total + d.data[d1]
        });
        data["total"] = total;
        return JSON.stringify(data);
      })
      // .attr("width", x.bandwidth)
      .attr("width", function (d) { return x(d[1]) - x(d[0]) })
      .attr("x", function (d) {
        return x(d[0]);
      })
      /*.attr("y", function (d) {
        return y(d[1]);
      })*/
      .attr("y", function (d) {
        return y(d.data.asset_type);
      })
      .attr("height", function (d) {
        return y.bandwidth()
      })
   
      .style("fill", function (d) {
        if (d.key == "working")
          return "#6AC259"
        else if (d.key == "not_working")
          return "#D75A4A"
        else if (d.key == "service_required")
          return "#fff147"
      })

    // .on("mouseover", function () {
    //   var currentEl = d3.select(this);
    //   var fadeInSpeed = 120;
    //   d3.select("#recttooltip_" + mainDivName)
    //     .transition()
    //     .duration(fadeInSpeed)
    //     .style("opacity", function () {
    //       return 1;
    //     })


    //   d3.select("#recttooltip_" + mainDivName).attr("transform", function (d) {
    //     var mouseCoords = d3.mouse(this.parentNode);
    //     var xCo = 0;
    //     if (mouseCoords[0] + 10 >= width * 0.80) {
    //       xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
    //         .attr("width"));
    //     } else {
    //       xCo = mouseCoords[0] + 10;
    //     }
    //     var x = xCo;
    //     var yCo = 0;
    //     if (mouseCoords[0] + 10 >= width * 0.80) {
    //       yCo = mouseCoords[1] + 10;
    //     } else {
    //       yCo = mouseCoords[1];
    //     }
    //     var x = xCo;
    //     var y = yCo;
    //     return "translate(" + x + "," + y + ")";
    //   });
    //   //CBT:calculate tooltips text
    //   var tooltipData = JSON.parse(currentEl.attr("data"));
    //   var tooltipsText = "";

    //   d3.selectAll("#recttooltipText_" + mainDivName).text("");
    //   var yPos = 0;

    //   d3.selectAll("#recttooltipText_" + mainDivName)
    //     .append("tspan")
    //     .attr("x", 0)
    //     .attr("y", yPos * 20)
    //     .attr("dy", "1.9em")
    //     .style('margin-bottom', '10px')
    //     .text(tooltipData.key + ":  " + tooltipData.value);

    //   yPos = yPos + 1;

    //   d3.selectAll("#recttooltipText_" + mainDivName)
    //     .append("tspan")
    //     .attr("x", 0).attr("y", yPos * 20)
    //     .attr("dy", "1.9em")
    //     .text("Total" + ":  " + tooltipData.total);

    //   // CBT:calculate width of the text based on characters

    //   var dims = helpers.getDimensions("recttooltipText_" + mainDivName);

    //   d3.selectAll("#recttooltipText_" + mainDivName + " tspan")
    //     .attr("x", dims.w + 4);

    //   d3.selectAll("#recttooltipRect_" + mainDivName)
    //     .attr("width", dims.w + 10)
    //     .attr("height", dims.h + 20);

    // })

    // .on("mousemove", function () {
    //   var currentEl = d3.select(this);
    //   currentEl.attr("r", 7);
    //   d3.selectAll("#recttooltip_" + mainDivName)
    //     .attr("transform", function (d) {
    //       var mouseCoords = d3.mouse(this.parentNode);
    //       var xCo = 0;
    //       if (mouseCoords[0] + 10 >= width * 0.60) {
    //         xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
    //           .attr("width"));
    //       } else {
    //         xCo = mouseCoords[0] + 20;
    //       }
    //       var x = xCo;
    //       var yCo = 0;
    //       if (mouseCoords[0] + 10 >= width * 0.60) {
    //         yCo = mouseCoords[1] - 10;
    //       } else {
    //         yCo = mouseCoords[1] - 10;
    //       }
    //       var x = xCo;
    //       var y = yCo;
    //       return "translate(" + x + "," + y + ")";
    //     });
    // })
    // .on("mouseout", function () {
    //   var currentEl = d3.select(this);
    //   d3.select("#recttooltip_" + mainDivName)
    //     .style("opacity", function () {
    //       return 0;
    //     })
    //     .attr("transform", function (d, i) {
    //       // klutzy, but it accounts for tooltip padding which could push it onscreen
    //       var x = -500;
    //       var y = -500;
    //       return "translate(" + x + "," + y + ")";
    //     });
    // });

    totalRectange.append("text")
    .attr("text-anchor", "middle")
    .attr('stroke',(d)=>{
      return 'black'
    })
    .attr("x", function (d) {
      // return x(d[0] + ((d[1]-d[0])/2) - 5)
      return x(d[0] + ((d[1]-d[0])/2) )
    }).attr('stroke-width',1)
    .attr("font-size", "15px")
    .attr('text-anchor','middle')
    // .attr('alignment-baseline','central')
    .attr("y", function (d) {
      return 20;
    })
    .text((d)=>{
      return d['data'][d['key']]
    })

    // var rectTooltipg = svg.append("g")
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", 10)
    //   .attr("text-anchor", "end")
    //   .attr("id", "recttooltip_" + mainDivName)
    //   .attr("style", "opacity:0")
    //   .attr("transform", "translate(-500,-500)");

    // rectTooltipg.append("rect")
    //   .attr("id", "recttooltipRect_" + mainDivName)
    //   .attr("x", 0)
    //   .attr("width", 120)
    //   .attr("height", 40)
    //   .attr("opacity", 0.9)
    //   .style("fill", "#F3ECEC");

    // rectTooltipg
    //   .append("text")
    //   .attr("id", "recttooltipText_" + mainDivName)
    //   .attr("x", 30)
    //   .attr("y", 15)
    //   .attr("fill", function () {
    //     return "#000"
    //   })
    //   .style("font-size", function (d) {
    //     return 12;
    //   })
    //   .style("font-family", function (d) {
    //     return "arial";
    //   })
    //   .text(function (d, i) {
    //     return "";
    //   });


    function type(d) {
      // d.date = parseDate(new Date(d.date));
      group.forEach(function (c) {
        d[c] = +d[c];
      });
      return d;
    }

    var helpers = {
      getDimensions: function (id) {
        var el = document.getElementById(id);
        var w = 0,
          h = 0;
        if (el) {
          var dimensions = (el as any).getBBox();
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
    };

    // $('#recttooltip_charts').css('position','relative');
    // $('#recttooltip_charts').css('z-index','1000');

  }

}
