import { useRef } from "react";
import * as d3 from 'd3';
import { axisBottom, scaleBand, scaleLinear } from "d3";

const BarChart2 = () => {
  const canvasRef = useRef(null);
  const data = [10, 20, 30, 25, 12, 59, 90];
  const xdata = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const width = 900;
  const height = 500;
  const margin = {
    top: 20,
    right: 20,
    left: 20,
    bottom: 20,
  }

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleBand().domain(xdata).range([0, innerWidth]);
  const yScale = scaleLinear().domain([0, Math.max(...data.map(item => item))]).range([innerHeight, 0]);
  const xAxis = (g: any) => g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(
      axisBottom(xScale)
        .tickFormat(i => i)
        .tickSizeOuter(0)
    );
  console.log(xAxis);
  return (
    <div ref={canvasRef} className="">
      <svg width={width} height={height} className="bg-[#00001E]">
        <g
          transform={`translate(${margin.top}, ${margin.bottom})`}>
          <line
            stroke="#ffffff"
            x1={0}
            y1={innerHeight}
            x2={0}
            y2={0}
          />
          <line
            stroke="#ffffff"
            x1={0}
            y1={innerHeight}
            x2={width}
            y2={innerHeight}
          />
          {yScale.ticks().map((item) => (
            <g transform={`translate(0,${yScale(item)})`} key={(item)}>
              <text
                x={-20}
                y={5}
              >{item}</text>
              <line
                stroke="#ffffff"
                x1={0}
                y1={0}
                x2={innerWidth}
                y2={0}
              />
            </g>
          ))}
          {xScale.domain().map((item) => (
            <g transform={`translate(${xScale(item)! + (xScale.bandwidth() / 2)},${innerHeight})`}>
              <text style={{ textAnchor: 'middle' }} dy="0.71em">{item}</text>
            </g>
          ))}

          {xdata.map((item, index) => <line x1={xScale(item)} x2={xScale(item)} y1={0} y2={innerHeight} stroke="#ffffff" />)}
          {/* <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
              <stop offset="100%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            </linearGradient>
          </defs> */}
          {xdata.map((item, index) =>
            <rect fill="#fff" className="bg-white text-white"
              x={xScale(item)! + 25}
              y={yScale(data[index])}
              width={xScale.bandwidth() - 50}
              height={innerHeight - yScale(data[index])} />)
          }
        </g>
      </svg>
    </div>
  )
}

export default BarChart2;