import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fbfb] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4f8296]"></div>
      <p className="ml-3 text-[#4f8296]">Loading weather data...</p>
    </div>
  );
};