
/**
 * @name formatDate
 * @description formats the new Date() to 2020-10-5.
 * @param {Date} date 
 * @returns {string} 2020-12-19
 */
export function formatDate(date: Date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  return [year, month, day].join('-');
}

/**
 * @name secondsToReadable
 * @description converts seconds to readable time.
 * @param {number} seconds 
 * @returns {string} 1hrs 45min
 */
export function secondsToReadable(seconds: number) {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds - hrs * 3600) / 60);
  return `${hrs}hrs ${mins}min`
}

/**
 * @name secondsToReadableTime
 * @description converts seconds to readable clock time.
 * @param {number} seconds 
 * @returns {string} 1:45
 */
export function secondsToReadableTime(seconds: number) {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds - hrs * 3600) / 60);
  return `${hrs}:${mins}`
}

/**
 * @name format_date_toMonth
 * @param {number} milliseconds 
 * @returns {string} Jan 12
 */
export function format_date_toMonth(date: number | string) {
  return (
    new Date(date).toDateString().split(" ").slice(1).slice(0, 2).join().replace(',', ' ')
  )
}


/**
 * @name getWeek no. from date
 * @param {number} date 2021-06-20 
 * @returns {string} number 25
 */
export function getWeek(date: Date): number {
  var onejan = new Date(date.getFullYear(), 0, 1);
  var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  // @ts-ignore
  var dayOfYear = ((today - onejan + 86400000) / 86400000);
  return Math.ceil(dayOfYear / 7)
}


export function formatData(data: any) {
  const days = data.days.map(((item: any) => (
    { date: item.date, grand_total: item.grand_total }
  )));

  return {
    user: data.user,
    range: data.range,
    days: days
  }
}


export function seedDatabase(firebase: any, seed: any) {
  const data = formatData(seed);
  localStorage.setItem('userid', data.user.id);
  firebase.firestore().collection(data.user.id).doc('user').set(data.user);
  firebase.firestore().collection(data.user.id).doc('range').set(data.range);
  firebase.firestore().collection(data.user.id).doc('days').set({ days: data.days });
}