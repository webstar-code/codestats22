import Link from "next/link";
import React, { useContext } from "react";
import { ReactContext } from "../context/context";


const Sidebar = () => {
  const state = useContext(ReactContext);
  return (
    <div className="w-64 flex-shrink-0 h-full border-r bg-white py-4 px-10">
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-blue-600 rounded-full overflow-hidden mb-5">
          <img src={state?.user?.photo} className="w-full object-cover" alt="profile_photo" />
        </div>
        <h1 className="text-lg whitespace-nowrap font-semibold text-primary">{state?.user?.display_name}</h1>
      </div>
      <div className="flex flex-col items-center justify-center my-5">
        <Link href={"/day"}><p className="w-full py-5 hover:bg-indigo-200 text-lg font-medium text-center cursor-pointer">Today</p></Link>
        <Link href={"/week"}><p className="w-full py-5 hover:bg-indigo-200 text-lg font-medium text-center cursor-pointer">This week</p></Link>
        <p className="w-full py-5 hover:bg-indigo-200 text-lg font-medium text-center cursor-pointer">This month</p>
        <p className="w-full py-5 hover:bg-indigo-200 text-lg font-medium text-center cursor-pointer">This year</p>

      </div>
    </div>
  )

}

export default Sidebar;