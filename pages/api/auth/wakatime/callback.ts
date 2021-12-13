// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'querystring'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const clientId = process.env.clientId;
    const clientSecret = process.env.clientSecret;
    const redirect_uri = process.env.redirect_uri;

    let code: any = req.query.code;

    var data = {
        'client_id': clientId,
        'client_secret': clientSecret,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code',
        'code': code
    };


    let params = new URLSearchParams();
    params.append('clientId', clientId!);
    params.append('client_secret', clientSecret!);
    params.append('redirect_uri', redirect_uri!);
    params.append('grant_type', 'authorization_code');
    params.append('code', code!);

    var config: AxiosRequestConfig<any> = {
        method: 'post',
        url: 'https://wakatime.com/oauth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify(data)
    };


    // res.send(data)
    let response = await axios.post(config.url!, config.data)
        .then((response) => response.data)
        .catch((err) => console.log(err.data));
    res.redirect(`http://localhost:3000/login/?token=${response.access_token}`)
}


