import React, { useEffect, useState } from 'react';
import { WeatherHeader } from './components/WeatherHeader';
import { WeatherContent } from './components/WeatherContent';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { useGeolocation } from './hooks/useGeolocation';
import { getWeatherByLocation, getWeatherByCity } from './services/weatherService';
import { WeatherData } from './types/weather';
import { handleApiError } from './utils/errorHandling';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { latitude, longitude, error: geoError } = useGeolocation();

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherByLocation(latitude, longitude);
    }
  }, [latitude, longitude]);

  const fetchWeatherByLocation = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherByLocation(lat, lon);
      setWeather(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    if (latitude && longitude) {
      fetchWeatherByLocation(latitude, longitude);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || geoError) {
    return <ErrorDisplay message={error || geoError} />;
  }

  if (!weather) return null;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f8fbfb]  overflow-x-hidden">
      <div className=" flex h-full grow flex-col">
        <WeatherHeader onSearch={handleSearch} onLocationClick={handleLocationClick} />
        <WeatherContent weather={weather} />
      </div>
    </div>
  );
}

export default App;