## some tips for time conversions
`
  function secondsToReadable(seconds: number) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds - hrs * 3600) / 60);
    return `${hrs}hrs ${mins}min`
  }
`

### convert seconds to readable time in hours and minutes
Example: 6420 seconds -> 1hrs 47mins

### convert hours to readable time in hours and minutes
Example: 1.8 hrs -> convert to seconds -> 6420 seconds -> 1hrs 47mins