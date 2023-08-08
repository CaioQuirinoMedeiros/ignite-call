export function convertTimeStringInMinutes(timeString: string) {
  const [hour, minute] = timeString.split(':').map(Number)

  return minute + 60 * hour
}
