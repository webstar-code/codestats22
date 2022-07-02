// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import admin from 'firebase-admin'
import creds from '../../codestats_creds.json';

const handler = async (event) => {
  try {
    // admin.initializeApp({
    //   credential: admin.credential.cert(creds)
    // })
    // setInterval(() => {
    //   admin.firestore().collection('TEST').add({ name: "test" });
    // }, 10000);
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }