import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="min-h-screen bg-[#f8fbfb] flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{message}</p>
      </div>
    </div>
  );
};