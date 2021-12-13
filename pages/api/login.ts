// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
    name: string
}

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    const clientId = process.env.clientId;
    const clientSecret = process.env.clientSecret;
    let redirect_uri = process.env.redirect_uri;

    console.log(process.env.clientId);
    let queryparams = `client_id=${clientId}&response_type=code&redirect_uri=${redirect_uri}&scope=email,read_stats,read_logged_time`;
    res.redirect('https://wakatime.com/oauth/authorize?' + (queryparams));
}


