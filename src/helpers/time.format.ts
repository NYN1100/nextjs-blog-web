export const calcEstimatedTimeToRead = (text: string) => {
  const wpm = 180;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
};
