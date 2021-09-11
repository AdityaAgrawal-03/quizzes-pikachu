export const createTimer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 15);
  return Number(time)
}