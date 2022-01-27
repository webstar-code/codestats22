import React, { useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { ReactContext } from '../context/context'

const Week = () => {
  const state = useContext(ReactContext)
  console.log(state);
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        Week
      </div>
    </div>

  )
}

export default Week;