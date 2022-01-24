
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
