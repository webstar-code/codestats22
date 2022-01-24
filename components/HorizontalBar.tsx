import { useRef } from "react";
import * as d3 from 'd3';
import { formatDate, secondsToReadableTime } from "../utils/methods";



const localdata = {
  "branches": [
    "main",
    "master"
  ],
  "data": [
    {
      "duration": 394.367256,
      "project": "CodeStats",
      "time": 1642919938.506725
    },
    {
      "duration": 8047.798214,
      "project": "ana",
      "time": 1642933907.895455
    },
    {
      "duration": 324.097853,
      "project": "AwesomeProject",
      "time": 1642945196.519228
    },
    {
      "duration": 6492.851654,
      "project": "CodeStats",
      "time": 1642949392.70704
    }
  ],
  "end": "2022-01-23T18:29:59Z",
  "start": "2022-01-22T18:30:00Z",
  "timezone": "Asia/Kolkata"
}




interface ProjectProps {
  data: {
    name: string,
    totalTime: number,
    timestamps: { duration: number, time: number }[]
  }[],
  date: number
}


const HorizontalBar: React.FC<ProjectProps> = ({ data, date }) => {
  console.log(date);
  const canvasRef = useRef(null);
  const width = 1200;
  const height = 48 * data.length;
  const margin = { top: 20, right: 20, bottom: 20, left: 120 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

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
            <g>
              <text
                y={yScale(item)}
                dy="15"
                style={{ textAnchor: 'end', fontSize: 14, fontWeight: 'bold' }}
                x={-5}
              >
                {item}
                &ensp;
                {secondsToReadableTime(data.filter((e) => e.name === item)[0].timestamps.reduce((prev, curr) => prev + curr.duration, 0))}
              </text>
            </g>
          ))}
          <g>
            {xScale.ticks(24).map((item) => (
              <g transform={`translate(${xScale(item)},-5)`}>
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