import React from "react";


const Sidebar = () => {
    return (
        <div className=" w-64 h-full border-r bg-white py-4 px-10">
            <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-blue-600"></div>
                <h1>Webstar</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="w-full py-5 hover:bg-indigo-400 text-center cursor-pointer">Today</p>
                <p className="w-full py-5 hover:bg-indigo-400 text-center cursor-pointer">This week</p>
                <p className="w-full py-5 hover:bg-indigo-400 text-center cursor-pointer">This month</p>
                <p className="w-full py-5 hover:bg-indigo-400 text-center cursor-pointer">This year</p>

            </div>
        </div>
    )

}

export default Sidebar;