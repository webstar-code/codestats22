// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let date = req.query.date;
  console.log(date);
  fetch(`https://wakatime.com/api/v1/users/current/durations?date=${date}`, {
    headers: {
      'Authorization': 'Bearer ' + req.headers['token']
    }
  }).then((res) => res.json())
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    })


}
