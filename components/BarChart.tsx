// @ts-nocheck
import * as d3 from 'd3';
import { useContext, useEffect, useRef } from 'react';
import { contextDay, contextInterface, ReactContext } from '../context/context';

interface IProps {
  state: {
    days: contextDay[] | undefined
  },
  week?: boolean
  month?: boolean
  year?: boolean

}

const BarChart: React.FC<IProps> = ({ state, month, week, year }) => {
  const canvasRef = useRef(null);
  const width = 1200;
  const height = 600;
  const margin = { top: 20, right: 20, bottom: 20, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  var colors = ["#ADFFE2", "#5CFFC6", "#00F59F", "#00B877", "#008F5D", "#005235"];
  var colorScale = d3.scaleQuantile()
    .domain([0, Math.max(...state?.days?.map((item) => Number(item.grand_total.decimal))!)])
    //@ts-ignore
    .range(colors)!;


  const yScale = d3.scaleLinear()
    .domain([0, Math.max(...state?.days?.map((item) => Number(item.grand_total.decimal))!)])
    .range([innerHeight, 0]);


  const xScale = d3.scaleBand()
    .domain(state?.days?.map((item) => item.date)!)
    .range([0, innerWidth])

  const tooltip = d3.select(canvasRef.current)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip-area")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style('position', 'absolute')


  const canvas = d3.select(canvasRef.current);

  var mouseover = function (d) {
    tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
  }
  var mousemove = function (d, day) {
    tooltip
      .html((day.date) + " : " + day?.grand_total?.text)
      .style("left", (d3.pointer(d, this)[0] + 70) + "px")
      .style("top", (d3.pointer(d, this)[1]) + "px")
  }
  var mouseleave = function (d) {
    tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
  }


  canvas.selectAll("rect")
    .data(state?.days!)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
  return (
    <div ref={canvasRef}>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.bottom})`}>
          <line
            stroke="#c0c0c0"
            x1={0}
            x2={innerWidth}
            y1={innerHeight}
            y2={innerHeight}
          />
          <line
            stroke="#c0c0c0"
            x1={0}
            x2={0}
            y1={0}
            y2={innerHeight}
          />
          {yScale.ticks().map((item) => (
            <g transform={`translate(0,${yScale(item)})`} key={(item)}>
              <text
                x={-20}
                y={5}
              >{item}</text>
              <line
                stroke="#c0c0c0"
                x1={0}
                y1={0}
                x2={innerWidth}
                y2={0}
              />
            </g>
          ))}

          <g>
            {week && xScale.domain().map((tickValue) => (
              <g
                transform={`translate(${xScale(tickValue) + xScale.bandwidth() / 2}, ${innerHeight})`}
              >
                <text
                  dy={20}
                  style={{ textAnchor: 'middle', fontSize: 14 }}
                >
                  {tickValue}
                </text>
              </g>
            ))}
          </g>
          {state?.days?.map((day, i) => (
            <rect
              height={innerHeight - yScale(Number(day?.grand_total?.decimal))}
              x={xScale(day.date)}
              y={yScale(Number(day.grand_total.decimal))}
              width={xScale.bandwidth()}
              fill={`${colorScale(Number(day.grand_total.decimal))}`}
            />
          ))}
        </g>

      </svg>
    </div>
  )
}


export default BarChart;