const handler = async (event) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-indexed
  const day = currentDate.getDate();

  // Ensure month and day are always two digits
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return await fetch(`https://wakatime.com/api/v1/users/current/durations?date=${formattedDate}&api_key=${process.env.WAKATIME_API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      return {
        statusCode: 200,
        body: JSON.stringify({ data }),
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: err }),
      };
    })
}
export { handler };
