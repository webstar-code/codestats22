import { useRef } from "react";
import * as d3 from 'd3';
import { formatDate, secondsToReadableTime } from "../utils/methods";

interface ProjectProps {
  data: {
    name: string,
    totalTime: number,
    timestamps: { duration: number, time: number }[]
  }[],
  date: number
}

const HorizontalBar: React.FC<ProjectProps> = ({ data, date }) => {
  const canvasRef = useRef(null);
  const width = 1200;
  const height = 36 * data.length;
  const margin = { top: 20, right: 20, bottom: 20, left: 120 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height;

  let fomratter = d3.timeFormat('%I %p');
  const xScale = d3
    .scaleTime()
    .domain([new Date(`${formatDate(new Date(date))} 00:00:00`), new Date(`${formatDate(new Date(date + 86400000))} 00:00:00`)])
    .range([0, innerWidth])

  const yScale = d3.scaleBand()
    .domain((data.map((p) => p.name)))
    .range([0, innerHeight]);

  return (

    <div ref={canvasRef}>
      <svg width={width}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {yScale.domain().map(item => (
            <g key={yScale(item)}>
              <text
                y={yScale(item)}
                dy="24"
                style={{ textAnchor: 'end' }}
                x={-5}
                className="text-sm font-semibold"
              >
                {item}
                &ensp;
                {secondsToReadableTime(data.filter((e) => e.name === item)[0].timestamps.reduce((prev, curr) => prev + curr.duration, 0))}
              </text>
            </g>
          ))}
          <g>
            {xScale.ticks(24).map((item) => (
              <g transform={`translate(${xScale(item)},-5)`} key={xScale(item)}>
                <line
                  x1={0}
                  x2={0}
                  y1={0}
                  y2={5}
                  stroke="#ebebeb"
                />
                <text
                  style={{ textAnchor: 'middle', fontSize: 10 }}
                  y={-2}
                >{fomratter(item)}</text>
              </g>
            ))}
          </g>
          <g width={'100%'} height={height}>
            {data.map(project => (
              project.timestamps.map((item) =>
                <rect
                  key={item.time}
                  x={xScale(new Date(item.time))}
                  y={yScale(project.name)! + 6}
                  width={xScale(new Date(item.time + item.duration * 1000)) - xScale(new Date(item.time))}
                  height={24}
                  fill="#1289ee"
                />
              )

            ))}
            {data.map((project, i) => (
              <line
                key={project.name}
                x1={0}
                x2={innerWidth}
                y1={yScale(project.name)}
                y2={yScale(project.name)}
                stroke="#ebebeb"
              />
            ))}
          </g>

          <line
            x1={0}
            x2={innerWidth}
            y1={0}
            y2={0}
            stroke="#ebebeb"
          />
          <line
            x1={0}
            x2={innerWidth}
            y1={innerHeight}
            y2={innerHeight}
            stroke="#ebebeb"
          />
          <line
            x1={0}
            x2={0}
            y1={0}
            y2={innerHeight}
            stroke="#ebebeb"
          />
          <line
            x1={innerWidth}
            x2={innerWidth}
            y1={0}
            y2={innerHeight}
            stroke="#ebebeb"
          />
        </g>
      </svg>
    </div >

  )
}

export default HorizontalBar