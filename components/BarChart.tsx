import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const BarChart = (data: any) => {
  const canvasRef = useRef(null);

  function secondsToReadable(seconds: number) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - hrs * 3600) / 60);
    return `${hrs}hrs ${mins}min`
  }

  const drawChart = (data: any) => {
    const projects = data.data.projects;
    const cWidth = 500;
    const cHeight = 500;

    let yMax = Math.ceil(projects[d3.maxIndex(projects, (item: any) => item.duration)].duration);
    const scale = cHeight / yMax;

    const yScale = d3.scaleLinear()
      .domain([
        0,
        yMax
      ]).range([0, cHeight]);

    // const xScale = d3.scaleTime()
    //   .domain(d3.extent(data[0].items, (d) => d.date))
    //   .range([0, cWidth]);

    const svgCanvas = d3.select(canvasRef.current)
      .append('svg')
      .attr("width", cWidth)
      .attr("height", cHeight)
      .style("border", "1px solid black")

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickSize(-cWidth)
      .tickFormat((val) => `${val}%`);
    const yAxisGroup = svgCanvas.append("g").call(yAxis);
    yAxisGroup.select(".domain").remove();
    yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)");
    yAxisGroup.selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "black")
      .attr("font-size", "0.75rem");

    svgCanvas.selectAll("rect")
      .data(projects)
      .enter()
      .append("rect")
      .attr("width", 40)
      .attr("height", (datapoint: any) => datapoint.duration * scale)
      .attr("fill", "blue")
      .attr("x", (datapoint, iteration) => iteration * 45)
      .attr("y", (datapoint: any, iteration) => cHeight - datapoint.duration * scale);

    svgCanvas.selectAll("text")
      .data(projects)
      .enter()
      .append("text")
      .attr("x", (datapoint: any, i) => i * 45 + 20)
      .attr("y", (datapoint: any, i) => cHeight - datapoint.duration * scale - 10)
      .text((datapoint: any) => secondsToReadable(datapoint.duration * 3600))

  }



  useEffect(() => {
    drawChart(data);
  }, []);

  return (
    <div ref={canvasRef}>

    </div>
  )
}


export default BarChart;