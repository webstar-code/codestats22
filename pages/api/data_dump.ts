// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// @ts-nocheck
import axios, { Axios, AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const config: AxiosRequestConfig<{
    method: string,
    url: string,
    headers: any
  }> = {
    method: 'GET',
    url: 'https://wakatime.com/api/v1/users/current/data_dumps',
    headers: {
      'Authorization': 'Bearer ' + req.headers['token']
    },
  };


  const resx = await axios(config).catch(err => res.status(401).send(err));

  if (!resx.data.data.length != 0) {
    res.send({ message: "Cannot import at the moment! Please try later." });
  } else {
    const url = resx.data.data[0].download_url;
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    }).catch(err => res.status(401).send(err));

    response.data.pipe(res)
  }


}
