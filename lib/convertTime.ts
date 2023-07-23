export function convertTime(time: Date) {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours}:${minutes} `
}
