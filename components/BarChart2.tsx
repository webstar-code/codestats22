import { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import { axisBottom, scaleBand, scaleLinear } from "d3";


interface BarChartProps {
  data: number[],
  xData: string[],
}

const BarChart2: React.FC<BarChartProps> = ({ data, xData }) => {
  console.log(data);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState({
    width: 0,
    height: 0
  })
  const xdata = xData;
  const width = 900;
  const height = 500;
  const margin = {
    top: 40,
    right: 40,
    left: 40,
    bottom: 40,
  }

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas({
        width: 900,
        height: 500
      })
      // setCanvas({
      //   width: canvasRef.current.getBoundingClientRect().width,
      //   height: canvasRef.current.getBoundingClientRect().height
      // })
    }
  }, []);

  const innerWidth = canvas.width - margin.left - margin.right;
  const innerHeight = canvas.height - margin.top - margin.bottom;

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
    <div ref={canvasRef} className="w-full h-full">
      <svg width={canvas.width} height={canvas.height} className="bg-[#00001E]">
        {data.length === 0 &&
          <text transform={`translate(${innerWidth / 2}, ${innerHeight / 2})`} stroke="white">No data found</text>
        }
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
              x={xScale(item)}
              y={yScale(data[index])}
              width={xScale.bandwidth()}
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