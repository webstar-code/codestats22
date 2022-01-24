import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BarChart from "../components/BarChart";
import { secondsToReadable, secondsToReadableTime } from '../utils/methods'
import { formatDate } from '../utils/methods'
import HorizontalBar from "../components/HorizontalBar";

interface TodayData {
  data: string,
  grand_total: { total_seconds: number },
  projects: {
    duration: number,
    project: string
  }[]
}

interface IProps {
  branches: string[];
  data: {
    duration: number;
    project: string;
    time: number;
  }[];
  end: string;
  start: string;
  timezone: string;

}




interface ProjectProps {
  name: string,
  totalTime: number,
  timestamps: { duration: number, time: number }[]
}

const Today: NextPage = () => {
  const [todayData, setTodayData] = useState<IProps>({ branches: [], data: [], end: "", start: "", timezone: "" });
  const [totalTime, setTotalTime] = useState<string>();
  const [date, setDate] = useState(Date.now());
  const [newData, setNewData] = useState<ProjectProps[]>([{ name: "", totalTime: 0, timestamps: [] }])
  // const fetchTodayData = () => {
  //   let token = localStorage.getItem('token')
  //   fetch('/api/today', {
  //     method: 'GET',
  //     headers: { 'token': token! }
  //   }).then((res) => res.json())
  //     .then((data: TodayData) => {
  //       let items: {
  //         duration: number,
  //         project: string
  //       }[] = [];
  //       data.projects.forEach((item) => {
  //         items.push({ duration: item.duration / 3600, project: item.project });
  //       })
  //       setTodayData({ ...data, projects: items });
  //     }).catch((err) => console.log(err))
  // }

  const fetchTodayData = () => {
    let token = localStorage.getItem('token')
    fetch(`/api/durations?date=${formatDate(new Date(date))}`, {
      method: 'GET',
      headers: { 'token': token! }
    }).then((res) => res.json())
      .then((data) => {
        console.log(data);

        setTodayData(data);
      }).catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchTodayData();
  }, []);


  useEffect(() => {
    if (todayData && todayData.data) {
      let uniqueProjects: string[] = [];
      console.log(todayData);
      todayData.data.forEach((item) => {
        if (!uniqueProjects.includes(item.project)) {
          uniqueProjects.push(item.project);
        }
      })
      let newD = uniqueProjects.map((project) => {
        let filterd = todayData.data.filter((item) => item.project === project);
        let newProject: ProjectProps = {
          name: "",
          totalTime: 0,
          timestamps: []
        };
        newProject.name = project;
        newProject.totalTime = filterd.reduce((prev, item) => prev + item.duration, 0);
        newProject.timestamps = filterd.map(item => { return { duration: item.duration, time: item.time * 1000 } });
        return newProject;
      })
      console.log(newD);
      setNewData(newD)

      if (newD) {
        let total_seconds = newD.map((item) => item.timestamps.reduce((prev, curr) => prev + curr.duration, 0)).reduce((prev, curr) => prev + curr, 0);
        setTotalTime(secondsToReadable(total_seconds));

      }
    }
  }, [todayData])
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="w-full h-full flex flex-col items-start py-10">
          <h1 className="text-primary text-2xl font-semibold m-10 p-5 rounded-lg bg-blue-200">{totalTime}</h1>

          {newData && newData[0]?.name &&
            <HorizontalBar data={newData} date={date} />
          }
        </div>

      </div>
    </div >
  )
}


export default Today