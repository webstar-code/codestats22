import React, { useContext, useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { contextDay, ReactContext } from '../context/context'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { formatDate, format_date_toMonth, getWeek } from '../utils/methods';
import BarChart2 from '../components/BarChart2';


const Month = () => {

  let defaultYear = new Date().getFullYear();

  const state = useContext(ReactContext)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [currMonth, setcurrMonth] = useState(new Date().getMonth());
  const [newData, setNewData] = useState<contextDay[]>([]);

  const [year, setyear] = useState(2021);


  useEffect(() => {
    if (state) {
      let temp_data: string[] = [];
      let x = state.days?.filter((item) => new Date(item.date).getMonth() === currMonth && new Date(item.date).getFullYear() === year);
      if (x) {
        setNewData(x);
      }
    }
  }, [currMonth]);

  const setToPrevMonth = () => {
    if (currMonth - 1 < 0) {
      setcurrMonth(11);
      setyear(year - 1)
    } else {
      setcurrMonth(currMonth - 1)
    }
  }

  const setToNextMonth = () => {
    if (currMonth + 1 >= 12) {
      setcurrMonth(0);
      setyear(year + 1)
    } else {
      setcurrMonth(currMonth + 1);
    }
  }
  console.log(newData);


  return (
    <div className='w-full h-full'>
      <Header />
      <div className="w-full flex">
        <Sidebar />

        <div className='w-full flex flex-col p-20'>
          <div className='w-full flex items-center'>
            <h1 className='text-base font-medium whitespace-nowrap'>{year}</h1>

            <div className="w-full flex-grow flex items-center justify-center">
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2" onClick={() => setToPrevMonth()}>
                <MdChevronLeft className="w-full h-full" />
              </div>
              <p className='mx-10 font-semibold'>{monthNames[currMonth]}</p>
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2" onClick={() => setToNextMonth()}>
                <MdChevronRight className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className='w-full h-full my-5'>
            <BarChart2
              data={newData.map((item) => Number(item.grand_total.decimal))}
              xData={newData.map((item) => {
                return item.date.substring(item.date.lastIndexOf("-")+1)
              })}

            />

          </div>
          {/* <BarChart state={{ days: state?.days }} /> */}
        </div>



      </div>
    </div>

  )
}

export default Month;