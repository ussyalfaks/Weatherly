export const formatHourString = (timestamp: number): string => {
  return new Date(timestamp * 1000).getHours() + ':00';
};

export const formatWeekday = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
};