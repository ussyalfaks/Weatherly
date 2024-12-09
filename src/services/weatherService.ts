import { WeatherData } from '../types/weather';
import { WeatherApiError } from '../utils/errorHandling';
import { weatherApi } from './api';
import { transformWeatherData } from '../utils/weatherTransformer';
import { AxiosError } from 'axios';

export const getWeatherByLocation = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const [currentWeather, forecast] = await Promise.all([
      weatherApi.getCurrentWeather(lat, lon),
      weatherApi.getForecast(lat, lon)
    ]);
    return transformWeatherData(currentWeather, forecast);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new WeatherApiError(
        error.response?.data?.message || 'Failed to fetch weather data'
      );
    }
    throw new WeatherApiError('An unexpected error occurred');
  }
};

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const geoData = await weatherApi.getWeatherByCity(city);
    if (!geoData) {
      throw new WeatherApiError('City not found');
    }
    return getWeatherByLocation(geoData.lat, geoData.lon);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new WeatherApiError('City not found');
      }
      throw new WeatherApiError(
        error.response?.data?.message || 'Failed to fetch weather data'
      );
    }
    throw new WeatherApiError('An unexpected error occurred');
  }
};