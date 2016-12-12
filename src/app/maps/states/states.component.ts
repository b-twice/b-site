import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { MapUtilities } from '../map-utilities';
@Component({
  selector: 'map-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  //  map components
  private map;
  private data: { states: string } = {
    states: "/assets/page/notfound/states.topo.json",
  };
  private width: number = 500;
  private height: number = 340;
  private svg;
  private path;
  private g;
  private projection;
  constructor(private mu: MapUtilities) { }

  ngOnInit() {
    this.svg = d3.select("#map").append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.projection = d3.geoAlbers()
      .scale(1)
      .translate([0, 0]);
    this.path = d3.geoPath(this.projection);
    this.g = this.svg.append("g")
      .attr("class", "boundary")
    this.drawMap();
  }

  drawMap() {
    d3.json(this.data.states, (error, us) => {
      if (error) throw error;

      let statesArray = topojson.feature(us, us["objects"].states).features;
      let states = this.mu.shuffleArray(statesArray);
      let state = states.shift();
      run.call(this);
      function run() {
        // Reset projection before redrawing
        this.projection
          .scale(1)
          .translate([0, 0]);
        this.mu.zoomIn(this.projection, this.path.bounds(state), this.width, this.height);
        var delay = 0;
        var duration = 0;

        this.g.append("path")
          .datum(state)
          .attr("d", this.path)
          .each(function (d) { duration = (d.length = this.getTotalLength()) * 3 })
          .style("stroke-width", "2px")
          .style("stroke-dasharray", function (d) { return `0,${d.length}`; })
          .transition()
            .delay((d, i) => { var delay1 = delay; delay += duration; return delay1; })
            .duration(d => { return duration; })
            .ease(d3.easeLinear)
            .on("start", function (d) { this.style.stroke = "#303e4d"; })
            .style("stroke-dasharray", function (d) { return `${d.length},${d.length}`; })
          .transition()
            .duration(1200)
            .style("stroke-opacity", 0)
            .attr("transform", "")
            .remove()
            .on("end", run.bind(this), this);

        if (states.length === 0) {
          states = this.shuffleArray(topojson.feature(us, us["objects"].states).features);
        }
        state = states.shift();
      }
    });
  }

}