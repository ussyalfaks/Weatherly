import { WeatherApiResponse, ForecastApiResponse } from '../types/api';
import { WeatherData, DailyForecast } from '../types/weather';
import { formatHourString, formatWeekday } from './dateFormatter';

export const transformWeatherData = (
  currentWeather: WeatherApiResponse,
  forecast: ForecastApiResponse
): WeatherData => {
  const dailyForecasts = groupForecastByDay(forecast.list);

  return {
    location: currentWeather.name,
    temperature: Math.round(currentWeather.main.temp),
    feelsLike: Math.round(currentWeather.main.feels_like),
    highTemp: Math.round(currentWeather.main.temp_max),
    description: currentWeather.weather[0].description,
    hourlyForecast: forecast.list.slice(0, 8).map(item => ({
      time: formatHourString(item.dt),
      temperature: Math.round(item.main.temp),
      precipitation: item.pop * 100,
    })),
    dailyForecast: dailyForecasts,
  };
};

const groupForecastByDay = (forecastList: ForecastApiResponse['list']): DailyForecast[] => {
  const dailyData = new Map<string, {
    temps: number[];
    icons: string[];
    descriptions: string[];
    date: number;
  }>();

  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    const existing = dailyData.get(date) || {
      temps: [],
      icons: [],
      descriptions: [],
      date: item.dt,
    };

    existing.temps.push(item.main.temp);
    existing.icons.push(item.weather[0].icon);
    existing.descriptions.push(item.weather[0].description);
    dailyData.set(date, existing);
  });

  return Array.from(dailyData.values())
    .slice(0, 5)
    .map(data => ({
      day: formatWeekday(data.date),
      minTemp: Math.round(Math.min(...data.temps)),
      maxTemp: Math.round(Math.max(...data.temps)),
      icon: `https://openweathermap.org/img/wn/${getMostFrequent(data.icons)}@2x.png`,
      description: getMostFrequent(data.descriptions),
    }));
};

const getMostFrequent = <T>(arr: T[]): T => {
  const counts = arr.reduce((acc, val) => {
    acc.set(val, (acc.get(val) || 0) + 1);
    return acc;
  }, new Map<T, number>());

  return Array.from(counts.entries())
    .reduce((a, b) => (b[1] > a[1] ? b : a))[0];
};