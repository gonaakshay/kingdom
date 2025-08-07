import React from 'react';

const LoadingSpinner = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        className={`${sizes[size]} border-t-blue-600 border-gray-300 rounded-full animate-spin`}
        role="status"
      />
      {text && <span className="text-gray-600 text-sm">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
