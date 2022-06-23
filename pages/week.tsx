import React, { useContext, useEffect, useState } from 'react';
import BarChart from '../components/BarChart';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { contextDay, ReactContext } from '../context/context'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const Week = () => {
  const state = useContext(ReactContext)
  const [currWeek, setCurrWeek] = useState(-7);
  const [newData, setNewData] = useState<contextDay[] | undefined>();
  useEffect(() => {
    setNewData(state?.days?.splice(currWeek))
  }, [currWeek]);
  // const newState: contextDay[] | undefined = state?.days?.splice(0, 7)
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className='flex flex-col'>
          <div className="w-full mb-10 flex-grow flex items-center justify-center">
            <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2">
              <MdChevronLeft className="w-full h-full" onClick={() => setCurrWeek(currWeek === 7 ? currWeek - 14 : currWeek - 7)} />
            </div>
            {/* <p className="text-lg px-10">{format_date_toMonth(date)}</p> */}
            <div className="w-8 h-8 cursor-pointer hover:bg-gray-300 rounded-full p-2">
              <MdChevronRight className="w-full h-full" onClick={() => setCurrWeek(currWeek === -7 ? currWeek + 14 : currWeek + 7)} />
            </div>
          </div>
          {state && newData &&
            <BarChart state={{ days: newData }} week={true} />
          }
        </div>
      </div>
    </div>

  )
}

export default Week;