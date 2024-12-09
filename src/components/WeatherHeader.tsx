import React from 'react';
import { CloudDrizzle } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface WeatherHeaderProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
}

export const WeatherHeader: React.FC<WeatherHeaderProps> = ({ onSearch, onLocationClick }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e8f0f3] px-10 py-3">
      <div className="flex items-center gap-4 text-[#0e171b]">
        <div className="size-4">
          <CloudDrizzle className='text-[#3fbff7]' />
        </div>
        <h2 className="text-[#0e171b] text-lg font-bold leading-tight tracking-[-0.015em]">
          Weatherly
        </h2>
      </div>
      <SearchBar onSearch={onSearch} onLocationClick={onLocationClick} />
    </header>
  );
};