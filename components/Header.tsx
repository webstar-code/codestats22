import React from 'react';

interface IProps {

}

const Header: React.FC<IProps> = () => {
    return (
        <div className=' w-full flex items-center justify-between bg-primary text-white px-8  py-2'>
            <h1 className="text-2xl leading-loose">CodeStats</h1>
            <button className='p-2 border border-black rounded-sm'>Log Out</button>
        </div>
    )


}

export default Header;