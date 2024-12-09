import React from 'react';
import { WeatherChart } from './WeatherChart';
import { WeatherData } from '../types/weather';

interface WeatherContentProps {
  weather: WeatherData;
}

export const WeatherContent: React.FC<WeatherContentProps> = ({ weather }) => {
  return (
    <div className="px-20 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h1 className="text-[#0e171b] tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
          Current Weather in {weather.location}
        </h1>
        <p className="text-[#0e171b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
          {weather.description}. It is currently {weather.temperature}°F. 
          Feels like {weather.feelsLike}°F. The high today was {weather.highTemp}°F
        </p>

        <div className="flex flex-wrap gap-4 px-4 py-6">
          <div className="flex bg-white min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#d0e0e6] p-6">
            <p className="text-[#0e171b] text-base font-medium leading-normal">Temperature</p>
            <WeatherChart data={weather.hourlyForecast} type="temperature" />
          </div>
          <div className="flex bg-white min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#d0e0e6] p-6">
            <p className="text-[#0e171b] text-base font-medium leading-normal">Precipitation</p>
            <WeatherChart data={weather.hourlyForecast} type="precipitation" />
          </div>
        </div>

        <h3 className="text-[#0e171b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Extended Forecast
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {weather.dailyForecast.map((day, index) => (
            <div key={index} className="flex flex-col gap-3 p-3 rounded-xl bg-white border-2">
              <img
                src={day.icon}
                alt={`Weather for ${day.day}`}
                className="w-full aspect-video object-cover rounded-xl"
              />
              <div>
                <p className="text-[#0e171b] text-base font-medium leading-normal">
                  {day.day}
                </p>
                <p className="text-[#4f8296] text-sm font-semibold leading-normal">
                  {day.minTemp}°F - {day.maxTemp}°F
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};