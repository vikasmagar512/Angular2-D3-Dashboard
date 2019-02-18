import {  OnInit } from '@angular/core';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';
import { IData } from '../idata';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit {
    @ViewChild('containerPieChart') element: ElementRef;

    private host;
    private svg;
    private width: number;
    private height: number;
    private radius: number;
    private htmlElement: HTMLElement;
    private pieData: IData[];

    private opacity = .8;
    private opacityHover = 1;
    private otherOpacityOnHover = .8;
    private tooltipMargin = 13;


    constructor(private dataService: DataService) { }

    ngAfterViewInit() {
        // this.htmlElement = this.element.nativeElement;
        // this.host = d3.select(this.htmlElement);
        this.dataService.$data.subscribe(data => {
            this.pieData = data;
            this.pieChart(data);
        });
    }
    pieChart(data) {
        const text = '';

        const width = 250;
        const height = 250;
        const thickness = 40;
        const duration = 750;
        const padding = 10;
        const opacity = .8;
        const opacityHover = 1;
        const otherOpacityOnHover = .8;
        const tooltipMargin = 13;

        const radius = Math.min(width - padding, height - padding) / 2;
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const outerRadius = radius - 10;

        d3.select('.piechart svg').remove();
        d3.select('.piechart .legend').remove();

        /////////////////////////////////////////////////////////////////////////
        // d3.json(this.pieChartData, function (error, data) {
        // d3.json("./assets/pieData.json", function (error, data) {
        // alert('pieData loaded')
        console.log('pieData loaded', data);
        const svg = d3.select('.piechart')
        .append('svg')
        .attr('class', 'pie')
        .attr('width', width)
        .attr('height', height);

        const g = svg.append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

        const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

        const pie = d3.pie()
        .value(function (d) { return d['value']; })
        .sort(null);

        const arcSelection = g.selectAll('path')
        .data(pie(data))
        .enter()
        .append('g');


        arcSelection.append('path')
        .attr('d', arc)
        .attr('fill', ((d, i) => {
            if (d.data.label === 'clear') {
                return '#D75A4A';
            } else if (d.data.label === 'dock') {
                return '#87CE7A';
             } else if (d.data.label === 'inspection') {
                return '#FFF147';
             } else if (d.data.label === 'hold') {
                return '#C17ACE';
             }
        }))
        .style('opacity', opacity);

        arcSelection.append('text')
            .attr('transform', (datum: any) => {
                datum.innerRadius = 0;
                datum.outerRadius = outerRadius;
                return 'translate(' + arc.centroid(datum) + ')';
            })
            .text(d => {
                return d.data['value']; }
            )
            .style('text-anchor', 'middle');

        arcSelection.on('mouseover', function (d) {
            d3.selectAll('path')
            .style('opacity', otherOpacityOnHover);
            d3.select(this)
            .style('opacity', opacityHover);

            const g = d3.select('.piechart svg')
            .style('cursor', 'pointer')
            .append('g')
            .attr('class', 'tooltip')
            .style('opacity', 0);

            g.append('text')
            .attr('class', 'name-text')
            .text(`${d.data['label']} (${d.data['value']})`)
            .attr('text-anchor', 'middle');

            const text = g.select('text');
            const bbox = text.node().getBBox();
            const padding = 2;
            g.insert('rect', 'text')
            .attr('x', bbox.x - padding)
            .attr('y', bbox.y - padding)
            .attr('width', bbox.width + (padding * 2))
            .attr('height', bbox.height + (padding * 2))
            .style('fill', '#F3ECEC')
            .style('opacity', 0.75);
        })
        .on('mousemove', function (d) {
            const mousePosition = d3.mouse(this);
            let x = mousePosition[0] + width / 2;
            let y = mousePosition[1] + height / 2 - tooltipMargin;

            const text = d3.select('.tooltip text');
            const bbox = text.node().getBBox();
            if (x - bbox.width / 2 < 0) {
            x = bbox.width / 2;
            } else if (width - x - bbox.width / 2 < 0) {
            x = width - bbox.width / 2;
            }

            if (y - bbox.height / 2 < 0) {
            y = bbox.height + tooltipMargin * 2;
            } else if (height - y - bbox.height / 2 < 0) {
            y = height - bbox.height / 2;
            }

            d3.select('.tooltip')
            .style('opacity', 1)
            .attr('transform', `translate(${x}, ${y})`);
        })
        .on('mouseout', function (d) {
            d3.select('.piechart svg')
            .style('cursor', 'none')
            .select('.tooltip').remove();
            d3.selectAll('path')
            .style('opacity', opacity);
        })
        .on('touchstart', function (d) {
            d3.select('.piechart svg')
            .style('cursor', 'none');
        })
        .each(function (d, i) { this._current = i; });

/*
        const legend = d3.select('.piechart').append('div')
        .attr('class', 'legend')
        .style('margin-top', '50px');
        .style('float', 'top');*/

      const legend = d3.select('.piechartLegend');
        const keys = legend.selectAll('.key')
        .data(data)
        .enter().append('div')
        .attr('class', 'key')
          .style('display', 'flex')
        .style('align-items', 'center')
          .style('justify-content', 'center')
          // .style('width', '50%')

        // .style('display', 'inline-block')

      // .style('margin-right', '20px');

        keys.append('div')
        .attr('class', 'symbol')
        .style('height', '10px')
        .style('width', '10px')
        .style('margin', '5px 5px')
        .style('border-radius', '50%')
        .style('display', 'inline-block')
        .style('background-color', ((d, i) => {
            if (d.label === 'clear') {
                return '#D75A4A';
            } else if (d.label === 'dock') {
              return '#87CE7A';
            } else if (d.label === 'inspection') {
              return '#FFF147';
            } else if (d.label === 'hold') {
              return '#C17ACE';
            }
        }));

        keys.append('div')
        .attr('class', 'name')
        .style('border-radius', '50%')
          .style('display', 'inline-block')
          .text(d => `${d['label']} (${d['value']})`);

        keys.exit().remove();
        // });

        // $('.piechart .legend>div').css({
        //   'border-bottom': '1px solid',
        //   'padding': '5px 0',
        // })

        // $('.piechart .legend').css({
        //   'padding': '0 10px',
        //   'font-size': '12px',
        //   // 'margin-left': '9px',
        // })

        // $('.piechart svg').css('float', 'left');
    }

    private setup(): void {
        this.width = 250;
        this.height = 250;
        this.radius = Math.min(this.width, this.height) / 2;
    }

    private buildSVG(): void {
        this.host.html('');
        this.svg = this.host.append('svg')
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .append('g')
            .attr('transform', `translate(${this.width / 2},${this.height / 2})`);
    }

    private buildPie(): void {
        // let pie = d3.layout.pie();
        const pie = d3.pie()
        .value(function (d) { return d['value']; });
        // .sort(null);
        // let values = this.pieData.map(data => data.value);
        const arcSelection = this.svg.selectAll('path')
            .data(pie(this.pieData))
            .enter()
            .append('g')
            .attr('class', 'arc');

        this.populatePie(arcSelection);
    }

    private populatePie(arcSelection): void {
        const pieData = this.pieData;
        const innerRadius = this.radius - 50;
        const outerRadius = this.radius - 10;
        const pieColor = d3.scaleOrdinal(d3.schemeCategory10);
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(outerRadius);
        arcSelection.append('path')
            .attr('d', arc)
            .attr('fill', (datum, index) => {
                // return pieColor(this.pieData[index].label);
            if (this.pieData[index].label === 'clear') {
                return '#D75A4A';
            } else if (this.pieData[index].label === 'dock') {
                return '#87CE7A';
                   } else if (this.pieData[index].label === 'inspection') {
                return '#FFF147';
                   } else if (this.pieData[index].label === 'hold') {
                  return '#C17ACE';
                     }
            });

        // arcSelection.append("text")
        //     .attr("transform", (datum: any) => {
        //         datum.innerRadius = 0;
        //         datum.outerRadius = outerRadius;
        //         return "translate(" + arc.centroid(datum) + ")";
        //     })
        //     .text((datum, index) => datum.data.value + datum.data.label )
        //     .style("text-anchor", "middle");

        arcSelection.on('mouseover', function (d) {
            d3.selectAll('path')
                .style('opacity', this.otherOpacityOnHover);
            d3.select(this)
                .style('opacity', this.opacityHover);

            const g = d3.select('svg')
            // let g =this.svg
                .style('cursor', 'pointer')
                .append('g')
                .attr('class', 'tooltip')
                .style('opacity', 1);

            g.append('text')
                .attr('class', 'name-text')
            //  .text((datum, index) => this.pieData[index].label)
                .text((datum, index) => {
                  return d.data.label + d.data.value; })
                    // return d.data})
                .attr('text-anchor', 'middle');
            const text = g.select('.name-text');
            const bbox = text.node().getBBox();
            const padding = 2;
            g.insert('rect', 'text')
                .attr('x', bbox.x + 32 )
                .attr('y', bbox.y + 34 )
                .attr('width', bbox.width + (padding * 2))
                .attr('height', bbox.height + (padding * 2))
                .style('fill', '#F3ECEC')
                .style('opacity', 0.75);
            });
        // .on("mousemove", function (d) {
        //     let mousePosition = d3.mouse(this);
        //     let x = mousePosition[0] + this.width / 2;
        //     let y = mousePosition[1] + this.height / 2 - this.tooltipMargin;

        //     let text = d3.select('.tooltip text');
        //     let bbox = text.node().getBBox();
        //     if (x - bbox.width / 2 < 0) {
        //         x = bbox.width / 2;
        //     }
        //     else if (this.width - x - bbox.width / 2 < 0) {
        //         x = this.width - bbox.width / 2;
        //     }

        //     if (y - bbox.height / 2 < 0) {
        //         y = bbox.height + this.tooltipMargin * 2;
        //     }
        //     else if (this.height - y - bbox.height / 2 < 0) {
        //         y = this.height - bbox.height / 2;
        //     }

        //     d3.select('.tooltip')
        //         .style("opacity", 1)
        //         .attr('transform', `translate(${x}, ${y})`);
        //     })
        // .on("mouseout", function (d) {
        //     d3.select(".piechart svg")
        //         .style("cursor", "none")
        //         .select(".tooltip").remove();
        //     d3.selectAll('path')
        //         .style("opacity", this.opacity);
        //     })
        // .on("touchstart", function (d) {
        //     d3.select(".piechart svg")
        //         .style("cursor", "none");
        //     })
        // .each(function (d, i) { this._current = i; });

            const legend = d3.select('#containerPieChart').append('div')
                .attr('class', 'legend')
                // .style('margin-top', '50px');
                .style('float', 'right');

            const keys = legend.selectAll('.key')
                .data(pieData)
                .enter().append('div')
                .attr('class', 'key')
                .style('display', 'flex')
                .style('align-items', 'center')
                .style('margin-right', '20px');

            keys.append('div')
                .attr('class', 'symbol')
                .style('height', '10px')
                .style('width', '10px')
                .style('margin', '5px 5px')
                .style('border-radius', '50%')
                .style('background-color', ((d, i) => {
                if (d.label === 'clear') {
                    return '#D75A4A';
                } else if (d.label === 'dock') {
                  return '#87CE7A';
                 } else if (d.label === 'inspection') {
                  return '#FFF147';
                 } else if (d.label === 'hold') {
                  return '#C17ACE';
                 }
                }));

            keys.append('div')
                .attr('class', 'name')
                .text(d => `${d['label']} (${d['value']})`);

            keys.exit().remove();
            // });

            // $('.piechart .legend>div').css({
            //   'border-bottom': '1px solid',
            //   'padding': '5px 0',
            // })

            // $('.piechart .legend').css({
            //   'padding': '0 10px',
            //   'font-size': '12px',
            //   // 'margin-left': '9px',
            // })

            // $('.piechart svg').css('float', 'left');
    }

}
