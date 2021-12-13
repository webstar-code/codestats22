// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { formatDate } from '../../utils/FormatDates'
import firebase from '../../firebase';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // setInterval(() => {
  //   firebase.firestore().collection('TEST2').add({ name: "test2" })
  // }, 10000);
  let date: string | Date = new Date();
  date = formatDate(date);
  console.log(date);
  fetch(`https://wakatime.com/api/v1/users/current/durations?date=${date}`, {
    headers: {
      'Authorization': 'Bearer ' + req.headers['token']
    }
  }).then((res) => res.json())
    .then((data) => res.send(formatData(data)))
    .catch((err) => {
      console.log(err);
      res.send(err);
    })
}

function formatData(data: any) {
  let grand_total = {
    total_seconds: 0
  };
  let projects: any = [];
  let localdata: any = [];
  if (data.data.length != 0) {
    data.data.forEach((item: any, index: number) => {
      if (!projects.includes(item.project)) {
        projects.push(item.project);
      }
    })
    projects = projects.map((item: any) => data.data.filter((e: any) => e.project == item));
    projects = projects.map((e: any) => {
      return e.reduce((total = { duration: 0, project: "" }, el: any) => ({ duration: el.duration + total.duration, project: el.project }))
    }
    );
    grand_total = { total_seconds: projects.map((e: any) => e.duration).reduce((t: any, e: any) => t + e) }
  }
  let date: any = new Date(data.end);
  date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split("T")[0];

  localdata = {
    date,
    grand_total,
    projects
  }
  return localdata;
}