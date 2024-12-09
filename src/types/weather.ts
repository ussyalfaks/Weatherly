export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  highTemp: number;
  description: string;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  precipitation: number;
}

export interface DailyForecast {
  day: string; minTemp: number;
  maxTemp: number;
  icon: string;
  description: string;}