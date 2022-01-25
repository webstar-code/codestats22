import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BarChart from "../components/BarChart";
import { secondsToReadable, format_date_toMonth } from '../utils/methods'
import { formatDate } from '../utils/methods'
import HorizontalBar from "../components/HorizontalBar";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'


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

  const fetchTodayData = () => {
    let token = localStorage.getItem('token')
    fetch(`/api/durations?date=${formatDate(new Date(date))}`, {
      method: 'GET',
      headers: { 'token': token! }
    }).then((res) => res.json())
      .then((data) => {
        setTodayData(data);
      }).catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchTodayData();
  }, [date]);


  useEffect(() => {
    if (todayData && todayData.data) {
      let uniqueProjects: string[] = [];
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
          <div className="w-full flex items-center m-10">
            <h1 className="text-primary text-2xl font-semibold p-5 rounded-lg bg-blue-200 whitespace-nowrap">{totalTime}</h1>
            <div className="w-full flex-grow flex items-center justify-center">
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2">
                <MdChevronLeft className="w-full h-full" onClick={() => setDate(date - 86400000)} />
              </div>
              <p className="text-lg px-10">{format_date_toMonth(date)}</p>
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2">
                <MdChevronRight className="w-full h-full" onClick={() => setDate(date + 86400000)} />
              </div>
            </div>

          </div>


          {newData && newData[0]?.name &&
            <HorizontalBar data={newData} date={date} />
          }
        </div>

      </div>
    </div >
  )
}


export default Today