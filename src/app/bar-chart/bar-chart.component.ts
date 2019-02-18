import { Component, OnInit, Input, ElementRef, SimpleChanges, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit, OnChanges {  
  @ViewChild('chart') chart: ElementRef;
  @Input('rangeColor') rangeColor = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'];
  @Input('showLegend') showLegend = false;
  @Input('showAxisX') showAxisX = true;
  @Input('showAxisY') showAxisY = true;
  @Input('sortTotal') sortTotal = false;

/*
  data = {
    labels: [
      'resilience', 'maintainability', 'accessibility',
      'uptime'
    ],
    series: [{
      label: '2012',
      values: [100, 75, 25, 35]
    },
    {
      label: '2013',
      values: [12, 43, 22, 11, 73, 25]
    },
    {
      label: '2014',
      values: [31, 28, 14, 8, 15, 21]
    }
    ]
  };
  
  */

  showYAxis = false;

  _chartData = {'labels': [], 'series': []};
  get chartData() {
    return this._chartData;
  }
  @Input('chartData')
  set chartData(value) {
    this._chartData = value;
    if  (Object.keys(value).length === 0 && value.constructor === Object) {
      return;
    }
      this.startGraphic();
  }


  ngOnInit() { }

  ngAfterViewInit() {
     // this.startGraphic();
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  clearGraphic() { }

  startGraphic() {
    // const d3: any = D3V4ORIGINAL;
    // const elRef = this.horizontalBarChart.nativeElement;
    const series = this.chartData.series;
    const labels = this.chartData.labels;
    const seriesLength = series.length;
    const chartWidth = 300;
    const barHeight = 20;
    const groupHeight = barHeight * seriesLength;
    const gapBetweenGroups = 10;
    const spaceForLabels = 150;
    const spaceForLegend = 150;

    const zippedData = [];
    for (let i = 0; i < labels.length; i++) {
      for (let j = 0; j < seriesLength; j++) {
        zippedData.push(series[j].values[i]);
      }
    }

    // const color = d3.scaleOrdinal(d3.schemeCategory20);
    let color = d3.scaleOrdinal(d3.schemeCategory10);
    
    const chartHeight = barHeight * zippedData.length + gapBetweenGroups * labels.length;

    const x = d3.scaleLinear()
      .domain([0, d3.max(zippedData)])
      .range([0, chartWidth]);

    const y = d3.scaleLinear()
      .range([chartHeight + gapBetweenGroups, 0]);

    const yAxis = d3.axisLeft(y);


    // Specify the chart area and dimensions
    const chart = d3.select(this.chart.nativeElement)
      .attr('width', spaceForLabels + chartWidth + spaceForLegend)
      .attr('height', chartHeight)
      .attr('x', 0)
      .attr('y', 0)
      ;

    // Create bars
    const bar = chart.selectAll('g')
      .data(zippedData)
      .enter().append('g')
      .attr('transform', function (d, i) {
        return 'translate(' + spaceForLabels + ',' +
        (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / seriesLength))) + ')';
      });

    // Create rectangles of the correct width
    bar.append('rect')
      .attr('fill', function (d, i) {
        return color(i % seriesLength);
      })
      .attr('class', 'bar')
      .attr('width', x)
      .attr('height', barHeight - 1);

    // Add text label in bar
    bar.append('text')
      .attr('x', function (d) {
        return x(d) - 3;
      })
      .attr('y', barHeight / 2)
      .attr('fill', 'red')
      .attr('dy', '.35em')
      .text(function (d) {
        return d;
      });

    // Draw labels
    bar.append('text')
      .attr('class', 'label')
      .attr('x', function (d) {
        return -10;
      })
      .attr('y', groupHeight / 2)
      .attr('dy', '.35em')
      .text(function (d, i) {
        if (i % seriesLength === 0) {
          return labels[Math.floor(i / seriesLength)];
        } else {
          return '';
        }
      });

    if (this.showYAxis) {
      chart.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + spaceForLabels + ', ' + -gapBetweenGroups / 2 + ')')
        .call(yAxis);
    }

    if (this.showLegend) {
      // Draw legend
      const legendRectSize = 18,
        legendSpacing = 4;

      const legend = chart.selectAll('.legend')
        .data(series)
        .enter()
        .append('g')
        .attr('transform', function (d, i) {
          const height = legendRectSize + legendSpacing;
          const offset = -gapBetweenGroups / 2;
          const horz = spaceForLabels + chartWidth + 40 - legendRectSize;
          const vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', function (d, i) {
          return color(i);
        })
        .style('stroke', function (d, i) {
          return color(i);
        });

      legend.append('text')
        .attr('class', 'legend')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function (d) {
          return d.label;
        });
    }
  }

}
