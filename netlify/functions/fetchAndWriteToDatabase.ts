import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import axios, { AxiosRequestConfig } from 'axios';
import admin from 'firebase-admin';
import creds from '../../codestats_creds.json';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    admin.initializeApp({
      // @ts-ignore
      credential: admin.credential.cert(creds)
    })
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-indexed
    const day = currentDate.getDate();

    // Ensure month and day are always two digits
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    const config: AxiosRequestConfig<{
      method: string,
      url: string,
      headers: any
    }> = {
      method: 'GET',
      url: `https://wakatime.com/api/v1/users/current/durations?date=${formattedDate}&api_key=${process.env.WAKATIME_API_KEY}`,
    };

    return await axios(config)
      .then(async (res) => {
        await admin.firestore().collection('TEST').doc(formattedDate).set({ ...res.data });
        return {
          statusCode: 200,
          body: JSON.stringify({ data: res.data }),
        };
      })
      .catch((err) => {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: err }),
        };
      })
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Something Went wrong", err }),
    };
  }
}
export { handler };

