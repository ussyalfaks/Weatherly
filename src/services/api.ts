import axios from 'axios';
import { WeatherApiResponse, ForecastApiResponse, GeocodingApiResponse } from '../types/api';


const API_KEY = import.meta.env.VITE_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const weatherApi = {
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherApiResponse> {
    const response = await axios.get<WeatherApiResponse>(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    );
    return response.data;
  },

  async getForecast(lat: number, lon: number): Promise<ForecastApiResponse> {
    const response = await axios.get<ForecastApiResponse>(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
    );
    return response.data;
  },

  async getWeatherByCity(city: string): Promise<GeocodingApiResponse> {
    const response = await axios.get<GeocodingApiResponse[]>(
      `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    return response.data[0];
  }
};