import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';

@Component({
  selector: 'bp-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  @Input() data: Array<{ value: number, date: string }> = [];
  @Input() title: string = 'Grafic';

	private width;
	private height;
	svg: any;

  public svgInner: any;
  public yScale: any;
  public xScale: any;
  public xAxis: any;
  public yAxis: any;
  public lineGroup: any;

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private x: any;
  private y: any;
  private line: d3Shape.Line<[number, number]> = d3Shape.line()
  .x( (d: any) => this.x(d.date) )
  .y( (d: any) => this.y(d.value) );  // this is line defination

 constructor () {
   // configure margins and width/height of the graph
   this.width = 960 - this.margin.left - this.margin.right;
   this.height = 500 - this.margin.top - this.margin.bottom;
 }

  ngOnInit(): void {
    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.hasOwnProperty('data') && this.data) {
    //   this.addXandYAxis();
    //   this.drawLineAndPath();
    //   window.addEventListener('resize', () => {
    //     this.addXandYAxis();
    //     this.drawLineAndPath();
    //   });
    // }
  }

  private buildSvg() {
    this.svg = d3.select('svg') // svg element from html
    .append('g')   // appends 'g' element for graph design
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private addXandYAxis() {
    // range of data configuring
    
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.data, (d) => d.date ));
    this.y.domain(d3Array.extent(this.data, (d) => d.value ));
    // Configure the X Axis
    this.svg.append('g')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3Axis.axisBottom(this.x));
    // Configure the Y Axis
    this.svg.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y));
  }
	
  private drawLineAndPath() {
    this.line = d3Shape.line()
      .x( (d: any) => this.x(d.date) )
      .y( (d: any) => this.y(d.value) );
    // Configuring line path
    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('d', this.line);
  }

}
