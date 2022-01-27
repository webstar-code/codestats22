import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

interface contextUser {
  created_at: string,
  display_name: string,
  photo: string
}
interface contextDay {
  date: string,
  grand_total: {
    decimal: string,
    digital: string,
    text: string,
    total_seconds: string
  }
}

interface contextInterface {
  user?: contextUser | undefined
  days?: contextDay[] | undefined
}

const ReactContext = React.createContext<contextInterface | null>(null);

interface IProps {
  children: React.ReactNode
}

const ReactProvider: React.FC<IProps> = ({ children }) => {
  const userid = 'dcba6617-3d13-4b5e-80a1-3969c2b157dd'
  // let userid = localStorage.getItem('userid') || '';
  const [state, setState] = useState<contextInterface | null>(null);
  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     setState((state: any) => state = { ...state, token: localStorage.getItem('token') });
  //   }
  //   if (userid && state.token) {
  //     firebase.firestore().collection('users').doc(userid).set({
  //       token: state.token
  //     }, { merge: true })
  //   }
  // }, [state.token]);

  const GetData = async (target: any) => {
    let content;
    const ref = firebase.firestore().collection(userid).doc(target);
    return await ref.get()
      .then((doc) => {
        if (doc.exists) {
          if (target === 'user') {
            let { created_at, display_name, photo } = doc.data() as contextUser;
            content = { user: { created_at, display_name, photo } };
            return content;
          } else if (target === 'days') {
            let { days } = doc.data() as { days: contextDay[] }
            content = { days: days };
            return content;
          }
        } else {
          console.log("No such document");
        }
      })
      .catch(err => console.log(err));
  };
  console.log(state);

  useEffect(() => {
    // GetData('user').then(data => setState(state => state = { ...state, days: data }));
    GetData('days').then((data) => setState(state => state = { ...state, days: data?.days }))
    GetData('user').then((data) => setState(state => state = { ...state, user: data?.user }))

    // if (userid) {
    //   GetData('days').then(data => setState(state => state = { ...state, days: data.days }))
    //   // GetData('range').then(data => setState(state => state = { ...state, range: data.range }))
    // }
  }, []);

  return (
    <ReactContext.Provider value={state}>
      {children}
    </ReactContext.Provider>
  )

}

export { ReactProvider, ReactContext };