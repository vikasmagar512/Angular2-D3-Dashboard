import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';
import { IData } from '../idata';
@Component({
  selector: 'app-stacked-horizontal',
  templateUrl: './stacked-horizontal.component.html',
  styleUrls: ['./stacked-horizontal.component.css']
})
export class StackedHorizontalComponent implements AfterViewInit{
  constructor(private dataService: DataService) { }
  ngAfterViewInit() {
    this.dataService.$data.subscribe(data => {
    const salesData = [
      {
        'label': 'PD',
        'value': 48
      },
      {
        'label': 'W1',
        'value': 42,
      },
      {
        'label': 'W2',
        'value': 80,
      }, {
        'label': 'W3',
        'value': 44,
      }, {
        'label': 'W4',
        'value': 41,
      },
    ];
      this.horizontalBarChart(salesData);
    });
  }
  horizontalBarChart(data) {

    const xValue = d => d.value;
    const xLabel = 'Value';
    const yValue = d => d.label;
    const yLabel = 'Label';
    var mainDiv = ".barchart";
    var mainDivName = "charts";
  
    // const margin = { left: 150, right: 30, top: 5, bottom: 75 };

    const barchartSvg = d3.select('.barchart svg');
    const barchartLegend = d3.select('.barchart .legend');
    if (barchartSvg !== null) {
      barchartSvg.remove();
      if (barchartLegend !== null) {
        barchartLegend.remove();
      }
    }

    const svgs = d3.select('.barchart').append('svg')

      .attr('id', 'barchartSvgId')
      .attr('width', '300')
      .attr('height', '300');

    const svg = d3.select('.barchart svg'),
      margin = {
        top: 20,
        right: 30,
        bottom: 60,
        left: 60
      },
      width = +svg.attr('width'),
      height = +svg.attr('height');

    // const tooltip = d3.select('.barchart').append('div').attr('class', 'toolTip');
    var tooltip = d3.select(".barchart")
      .append("div")
      .attr("class", "toolTip")
      .style("position", "absolute")
      // .style("background-color", "black")
      .style("opacity", 0)
      // .style("min-width", "50px")
      .style("height", "auto")
      .style("background", "none repeat scroll 0 0 #ffffff")
      // .style("border", "1px solid #6F257F")
      .style("padding", "5px")
      .style("text-align", "center")
      .style("color", "black")
    ;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
    const xAxisG = g.append('g')
        .attr('transform', `translate(0, ${innerHeight})`);
    const yAxisG = g.append('g');

    /*xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('x', innerWidth / 2)
        .attr('y', 55)
        .text(xLabel);*/

    const xScale = d3.scaleLinear();
    const yScale = d3.scaleBand()
      .paddingInner(0.3)
      .paddingOuter(0);

    const xTicks = 4;
    const xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(xTicks)
      .tickPadding(5)
      .tickFormat(d3.format('.0s'))
      .tickSize(-innerHeight);

    const yAxis = d3.axisLeft()
      .scale(yScale)
      .tickPadding(5)
      .tickSize(-innerWidth);

    yScale
      .domain(data.map(yValue).reverse())
      .range([innerHeight, 0]);

    xScale
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth])
      .nice(xTicks);

    const bar = g.selectAll('rect').data(data)
      .enter().append('rect')

    bar.attr('x', 0)
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', d => yScale.bandwidth())
        .attr('fill', '#ffd500')



      .on("mousemove", function(d){
        tooltip.style("left", d3.event.pageX+10+"px")
        .style("top", d3.event.pageY-25+"px")
        .style("display", "inline-block")
        .html((d.label)+":"+(d.value))
      });
      bar.on("mouseover", function(d) {
        var pos = d3.mouse(this);
        console.log(pos);
        tooltip
          .style("opacity", 1)
          // .style("color", 'black')
          .style("left", d3.event.x + "px")
          .style("top", d3.event.y + "px")
          .html(d.value);
      })
      bar.on("mouseout", function() {
        tooltip.style("opacity", 0);
      })

    /*bar.on('mouseover', function(d) {
      const gr = d3.select('.barchart svg')
      // let g =this.svg
        .style('cursor', 'pointer')
        .append('g')
        .attr('class', 'tooltip')
        .style('opacity', 1);

      gr.append('text')
          .attr('class', 'name-text1')
           .text((datum, index) => data[index].label)
          .attr('text-anchor', 'middle');
        const text = gr.select('.name-text1');
        const bbox = text.node().getBBox();
        const padding = 2;
        gr.insert('rect', 'text')
          .attr('x', bbox.x  )
          .attr('y', bbox.y)
          .attr('width', bbox.width + (padding * 2))
          .attr('height', bbox.height + (padding * 2))
          .style('fill', '#F3ECEC')
          .style('opacity', 0.75);
      })*/

/*
      bar.on('mouseover', function(d) {
        tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
            .style("opacity", 1)
          .html((d.label) + '<br>' + '£' + (d.value));*/
        //
        // tooltip
        //   .html((d.label) + '<br>' + '£' + (d.value))
        //   .style("opacity", 1)
        //   .style("left", (parseInt(d3.select(this).attr("cx")) + document.getElementById("barchartSvgId").offsetLeft) + "px")
        //   .style("top", (parseInt(d3.select(this).attr("cy")) + document.getElementById("barchartSvgId").offsetTop) + "px");
      // })
/*
      .on('mouseout', function(d) {
        tooltip.style("opacity", 0);
      });
*/
    bar.on("mouseover", function (d) {
      var currentEl = d3.select(this);
      var fadeInSpeed = 120;
      d3.select("#recttooltip_" + mainDivName)
        .transition()
        .duration(fadeInSpeed)
        .style("opacity", function () {
          return 1;
        })

      d3.select("#recttooltip_" + mainDivName).attr("transform", function (d) {
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
      // var tooltipData = JSON.parse(currentEl.attr("data"));
      var tooltipsText = "";

      d3.selectAll("#recttooltipText_" + mainDivName).text("");
      var yPos = 0;

      d3.selectAll("#recttooltipText_" + mainDivName)
        .append("tspan")
        .attr("x", 0)
        .attr("y", yPos * 20)
        .attr("dy", "1.9em")
        .style('margin-bottom', '10px')
        .text(d.label + ":  " + d.value);

      yPos = yPos + 1;

      // d3.selectAll("#recttooltipText_" + mainDivName)
      //   .append("tspan")
      //   .attr("x", 0).attr("y", yPos * 20)
      //   .attr("dy", "1.9em")
      //   .text("Total" + ":  " + tooltipData.total);

      // CBT:calculate width of the text based on characters

      var dims = helpers.getDimensions("recttooltipText_" + mainDivName);

      d3.selectAll("#recttooltipText_" + mainDivName + " tspan")
        .attr("x", dims.w + 4);

      d3.selectAll("#recttooltipRect_" + mainDivName)
        .attr("width", dims.w + 10)
        .attr("height", dims.h + 20);

    });

    bar.on("mousemove", function () {
      var currentEl = d3.select(this);
      currentEl.attr("r", 7);
      d3.selectAll("#recttooltip_" + mainDivName)
        .attr("transform", function (d) {
          var mouseCoords = d3.mouse(this.parentNode);
          var xCo = 0;
          if (mouseCoords[0] + 10 >= width * 0.60) {
            xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
              .attr("width"));
          } else {
            xCo = mouseCoords[0] + 20;
          }
          var x = xCo;
          var yCo = 0;
          if (mouseCoords[0] + 10 >= width * 0.60) {
            yCo = mouseCoords[1] - 10;
          } else {
            yCo = mouseCoords[1] - 10;
          }
          var x = xCo;
          var y = yCo;
          return "translate(" + x + "," + y + ")";
        });
    });
    var rectTooltipg = d3.select('.barchart svg').append("g")
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
      .attr("height", 40)
      .attr("opacity", 0.9)
      .style("fill", "#fff");

    rectTooltipg
      .append("text")
      .attr("id", "recttooltipText_" + mainDivName)
      .attr("x", 30)
      .attr("y", 15)
      .attr("fill", function () {
        return "#000"
      })
      .style("font-size", function (d) {
        return 12;
      })
      .style("font-family", function (d) {
        return "arial";
      })
      .text(function (d, i) {
        return "";
      });

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
    bar.on("mouseout", function () {
      var currentEl = d3.select(this);
      d3.select("#recttooltip_" + mainDivName)
        .style("opacity", function () {
          return 0;
        })
        .attr("transform", function (d, i) {
          // klutzy, but it accounts for tooltip padding which could push it onscreen
          var x = -500;
          var y = -500;
          return "translate(" + x + "," + y + ")";
        });
    });

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
    yAxisG.selectAll('.tick line').remove();

    setInterval(function() {
      // d3.select(".domain").classed("datum", true).attr("id", null).attr("width", 200);
      d3.selectAll('.domain').attr('display', 'none');
      d3.selectAll('.tick line').attr('stroke', '#C0C0BB');
      d3.selectAll('.tick text')
      .attr('fill', '#8E8883')
      .attr('font-size', '14pt')
      .attr('font-family', '#sans-serif');

      d3.selectAll('.axis-label')
      .attr('fill', '#635F5D')
      .attr('font-size', '20pt')
      .attr('font-family', '#sans-serif');
    }, 200);
  }

}
