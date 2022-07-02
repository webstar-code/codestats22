import React, { useEffect } from 'react';
import { seedDatabase } from '../utils/methods';
import firebase from '../firebase';

interface IProps {

}

function Header() {

  let token: string | null = "sec_vwjL1olHrIILq5XJ18OYGBMdiEJFHPvONf8HpsnfEHwjd1hwljsj3xutHO3wNHihbwjU8D1dqeJt9fsm";
  useEffect(() => {
    // Perform localStorage action
    if (localStorage.getItem('key')) {
      token = localStorage.getItem('key')
    }
  }, [])
  function get_data_dumps() {
    console.log(token);
    if (token) {

      fetch(`/api/data_dump`, {
        method: 'GET',
        headers: { 'token': token }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            return;
          }
          console.log(data);
          localStorage.setItem('userid', data.user.id);
          seedDatabase(firebase, data);
        })
        .catch(err => console.log(err));
    }
  }



  return (
    <div className=' w-full flex items-center justify-between bg-primary text-white px-8  py-2'>
      <h1 className="text-2xl leading-loose">CodeStats</h1>
      <button onClick={() => get_data_dumps()}>Import Data</button>
      <button className='p-2 border border-black rounded-sm'>Log Out</button>
    </div>
  );


}

export default Header;