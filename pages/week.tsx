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

  const state = useContext(ReactContext)

  const [currWeek, setCurrWeek] = useState(getWeek(new Date()));
  const [newData, setNewData] = useState<contextDay[]>([]);

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

    return weekdays;
  }

  useEffect(() => {
    let temp_weekDays = GetWeekDays(currWeek);
    console.log(temp_weekDays);
    setweekDays(GetWeekDays(currWeek))

  }, [currWeek]);

  useEffect(() => {
    let temp_data: contextDay[] = [];
 
    if (state?.days?.length) {
      for (let i = 0; i < state?.days?.length; i++) {
        let item = state.days[i];
        if (weekDays.includes(item.date)) {
          temp_data.push(item);
        }
      }
    }
    setNewData(temp_data);

    // state?.days?.forEach((item) => {
    //   if (weekDays.includes(item.date)) {
    //     temp_data.push(item);
    //   }
    // });
  }, [weekDays]);

  const setToPrevWeek = () => {
    if (currWeek - 1 <= 0) {
      setCurrWeek(52);
      setyear(year - 1);
    } else {
      setCurrWeek(currWeek - 1);
    }
  }

  console.log(newData);


  const setToNextWeek = () => {
    if (currWeek + 1 > 52) {
      setCurrWeek(0);
      setyear(year + 1);
    } else {
      setCurrWeek(currWeek + 1);
    }
  }

  const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];



  return (
    <div className='w-full h-full'>
      <Header />
      <div className="w-full flex">
        <Sidebar />

        <div className='w-full flex flex-col p-20'>
          <div className='w-full flex items-center'>
            <h1 className='text-base font-medium whitespace-nowrap'>Week {currWeek} / {year}</h1>

            <div className="w-full flex-grow flex items-center justify-center">
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2" onClick={() => setToPrevWeek()}>
                <MdChevronLeft className="w-full h-full" />
              </div>
              <p className="text-lg px-5">{format_date_toMonth(weekDays[0])}</p>
              -
              <p className="text-lg px-5">{format_date_toMonth(weekDays[weekDays.length - 1])}</p>
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2" onClick={() => setToNextWeek()}>
                <MdChevronRight className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className='w-full h-full my-5'>
            <BarChart2
              data={newData.map((item) => Number(item.grand_total.decimal))}
              xData={weeks}

            />

          </div>
          {/* <BarChart state={{ days: state?.days }} /> */}
        </div>



      </div>
    </div>

  )
}

export default Week;