import React, { useContext, useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { contextDay, ReactContext } from '../context/context'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { formatDate, format_date_toMonth, getWeek } from '../utils/methods';
import BarChart2 from '../components/BarChart2';


const Year = () => {

  let defaultYear = new Date().getFullYear();

  const state = useContext(ReactContext)

  const [newData, setNewData] = useState<contextDay[]>([]);

  const [year, setyear] = useState(2021);


  useEffect(() => {
    if (state) {
      let x = state.days?.filter((item) => new Date(item.date).getFullYear() === year);
      if (x) {
        setNewData(x);
      }
    }
  }, [year]);

  const setToPrevYear = () => {
    setyear(year - 1);
  }

  const setToNextYear = () => {
    setyear(year + 1);

  }
  console.log(newData);


  return (
    <div className='w-full h-full'>
      <Header />
      <div className="w-full flex">
        <Sidebar />

        <div className='w-full flex flex-col p-20'>
          <div className='w-full flex items-center'>

            <div className="w-full flex-grow flex items-center justify-center">
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2" onClick={() => setToPrevYear()}>
                <MdChevronLeft className="w-full h-full" />
              </div>
              <p className='mx-10 font-semibold'>{year}</p>
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2" onClick={() => setToNextYear()}>
                <MdChevronRight className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className='w-full h-full my-5'>
            <BarChart2
              data={newData.map((item) => Number(item.grand_total.decimal))}
              xData={newData.map((item) => {
               return item.date
              })}

            />

          </div>
          {/* <BarChart state={{ days: state?.days }} /> */}
        </div>



      </div>
    </div>

  )
}

export default Year;