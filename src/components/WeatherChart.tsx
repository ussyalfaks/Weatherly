import React from 'react';
import { HourlyForecast } from '../types/weather';

interface WeatherChartProps {
  data: HourlyForecast[];
  type: 'temperature' | 'precipitation';
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ data, type }) => {
  const values = data.map(hour => type === 'temperature' ? hour.temperature : hour.precipitation);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min;

  const getY = (value: number) => {
    return 148 - ((value - min) / range) * 148;
  };

  const points = data.map((hour, index) => {
    const x = (index / (data.length - 1)) * 472;
    const y = getY(type === 'temperature' ? hour.temperature : hour.precipitation);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
      <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" preserveAspectRatio="none">
        <path
          d={`M${points}`}
          fill="url(#paint0_linear_1131_5935)"
          stroke="#4f8296"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="paint0_linear_1131_5935" x1="236" y1="1" x2="236" y2="149">
            <stop stopColor="#e8f0f3" />
            <stop offset="1" stopColor="#e8f0f3" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex justify-around">
        {data.slice(0, 7).map((hour, index) => (
          <p key={index} className="text-[#4f8296] text-[13px] font-bold leading-normal tracking-[0.015em]">
            {hour.time}
          </p>
        ))}
      </div>
    </div>
  );
};