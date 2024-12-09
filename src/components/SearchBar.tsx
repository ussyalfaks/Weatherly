import React, { useState } from 'react';
import { Search, Globe } from 'lucide-react';
import Figma from '../Assets/Figma.svg'


interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationClick: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onLocationClick }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="flex gap-8 items-center">
      <form onSubmit={handleSubmit} className="flex-1">
        <label className="flex flex-col min-w-40 !h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#4f8296] flex border-none bg-[#e8f0f3] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <Search size={24} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e171b] focus:outline-0 focus:ring-0 border-none bg-[#e8f0f3] focus:border-none h-full placeholder:text-[#4f8296] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            />
          </div>
        </label>
      </form>
      <button
        onClick={onLocationClick}
        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e8f0f3] text-[#0e171b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
      >
        <Globe size={20} />
      </button>

      <a href="https://www.figma.com" target="_blank" rel="noopener noreferrer">
      <img src={Figma} className="w w-8 h-8 cursor-pointer" alt="Figma logo" />
    </a>

    </div>
  );
};