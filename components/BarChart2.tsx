import { CSSProperties, useRef } from "react";
import * as d3 from 'd3';
import { axisBottom, scaleBand, scaleLinear } from "d3";


interface BarChartProps {
  data: number[],
  xData: string[],
}

const BarChart2: React.FC<BarChartProps> = ({ data, xData }) => {
  const canvasRef = useRef(null);
  const xdata = xData;
  const width = 900;
  const height = 500;
  const margin = {
    top: 40,
    right: 40,
    left: 40,
    bottom: 40,
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
  return (
    <div ref={canvasRef} className="">
      <svg width={width} height={height} className="bg-[#00001E]">
        <g
          transform={`translate(${margin.top}, ${margin.bottom})`}>
          <line
            stroke="#FFFFFF33"
            x1={0}
            y1={innerHeight}
            x2={0}
            y2={0}
          />
          <line
            stroke="#FFFFFF33"
            x1={0}
            y1={innerHeight}
            x2={width}
            y2={innerHeight}
          />
          {yScale.ticks().map((item) => (
            <g transform={`translate(0,${yScale(item)})`} key={(item)}>
              <text
                style={{ stroke: "white", fontWeight: 200 }}
                className="text-white"
                x={-30}
                y={5}
              >{item}</text>
              <line
                stroke="#FFFFFF33"
                x1={0}
                y1={0}
                x2={innerWidth}
                y2={0}
              />
            </g>
          ))}
          {xScale.domain().map((item) => (
            <g transform={`translate(${xScale(item)! + (xScale.bandwidth() / 2)},${innerHeight + 20})`}>
              <text className="font-normal" style={{ textAnchor: 'middle', stroke: "white", fontWeight: 200 }}>{item}</text>
            </g>
          ))}

          {xdata.map((item, index) => <line x1={xScale(item)} x2={xScale(item)} y1={0} y2={innerHeight} stroke="#FFFFFF33" />)}
     
          <defs>
            <linearGradient id="Gradient1">
              <stop className="stop1" offset="0%" />
              <stop className="stop2" offset="50%" />
              <stop className="stop3" offset="100%" />
            </linearGradient>
            <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="rgba(0, 150, 199, 0.58" stop-opacity="110%" />
              <stop offset="50%" stop-color="rgba(166, 193, 209, 0.2131)" stop-opacity="81.44%" />
              <stop offset="100%" stop-color="rgba(196, 196, 196, 0)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {xdata.map((item, index) =>
            <rect
              x={xScale(item)! + 25}
              y={yScale(data[index])}
              width={xScale.bandwidth() - 50}
              height={innerHeight - yScale(data[index])}
              stroke="#0096C7"
              strokeLinejoin="round"
              fill="url(#Gradient2)"
            />)
          }
        </g>
      </svg>
    </div >
  )
}


export default BarChart2;