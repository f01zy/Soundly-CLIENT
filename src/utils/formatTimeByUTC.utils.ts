const formatTime = (time: number) => {
  return time < 10 ? "0" + time : time;
}

export const formatTimeByUTC = (date: Date) => {
  const format = new Date(date)

  let hours = format.getUTCHours()
  let minutes = format.getUTCMinutes()
  let seconds = format.getUTCSeconds()

  return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
}