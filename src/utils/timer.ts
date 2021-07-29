export const createTimer = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);
  return Number(time)
}