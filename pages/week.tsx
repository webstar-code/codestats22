import React, { useContext, useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { contextDay, ReactContext } from '../context/context'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { formatDate, format_date_toMonth, getWeek } from '../utils/methods';
import BarChart2 from '../components/BarChart2';


const Week = () => {

  let defaultYear = new Date().getFullYear();
  let firstday_ofweek;
  let lastday_ofweek;

  const state = useContext(ReactContext)

  const [currWeek, setCurrWeek] = useState(getWeek(new Date()));
  const [newData, setNewData] = useState<contextDay[] | undefined>();

  const [year, setyear] = useState(defaultYear);
  const [weekDays, setweekDays] = useState<string[]>([]);

  function calculate_date_from_weekno(weekno: number) {
    const firstDay = new Date(year, 0, 1);
    let days = 2 + 0 + (weekno - 1) * 7 - firstDay.getDay();
    return new Date(year, 0, days);
  }

  function GetWeekDays(weekno: number) {
    let week_start_date = calculate_date_from_weekno(weekno);
    let weekdays: any[] = [];
    weekdays.push(formatDate(week_start_date));
    for (let i = 1; i < 7; i++) {
      let tommorow = new Date(week_start_date.getTime() + (24 * 60 * 60 * 1000 * i));
      weekdays.push(formatDate(tommorow));
    }
    firstday_ofweek = format_date_toMonth(weekdays[0]);
    lastday_ofweek = format_date_toMonth(weekdays[6]);
    return weekdays;
  }

  useEffect(() => {
    setweekDays(GetWeekDays(currWeek + 1))
  }, [currWeek]);

  const setToPrevWeek = () => {
    if (currWeek - 1 <= 0) {
      setCurrWeek(52);
      setyear(year - 1);
    } else {
      setCurrWeek(currWeek - 1);
    }
  }


  const setToNextWeek = () => {
    if (currWeek + 1 > 52) {
      setCurrWeek(0);
      setyear(year + 1);
    } else {
      setCurrWeek(currWeek + 1);
    }
  }


  return (
    <div className='w-full h-full'>
      <Header />
      <div className="w-full flex">
        <Sidebar />

        <div className='w-full flex flex-col p-20'>
          <div className='w-full flex items-center'>
            <h1 className='text-base font-medium whitespace-nowrap'>Week {currWeek} / {year}</h1>

            <div className="w-full flex-grow flex items-center justify-center">
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2">
                <MdChevronLeft className="w-full h-full" onClick={() => setToPrevWeek()} />
              </div>
              <p className="text-lg px-10">{format_date_toMonth(weekDays[0])}</p>
              -
              <p className="text-lg px-10">{format_date_toMonth(weekDays[weekDays.length - 1])}</p>
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2">
                <MdChevronRight className="w-full h-full" onClick={() => setToNextWeek()} />
              </div>
            </div>
          </div>
          <div className='w-full m-4'>
            <BarChart2 />

          </div>
          {/* <BarChart state={{ days: state?.days }} /> */}
        </div>


        {/* <div className='flex flex-col'>
          <div className="w-full mb-10 flex-grow flex items-center justify-center">
            <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2">
              <MdChevronLeft className="w-full h-full" onClick={() => setCurrWeek(currWeek === 7 ? currWeek - 14 : currWeek - 7)} />
            </div>
            <p className="text-lg px-10">{format_date_toMonth(date)}</p>
            <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2">
              <MdChevronRight className="w-full h-full" onClick={() => setCurrWeek(currWeek === -7 ? currWeek + 14 : currWeek + 7)} />
            </div>
          </div>
          {state && newData &&
            <BarChart state={{ days: newData }} week={true} />
          }
        </div> */}
      </div>
    </div>

  )
}

export default Week;