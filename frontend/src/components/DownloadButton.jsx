import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const DownloadButton = ({ content, filename }) => {
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const href = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <button 
      onClick={handleDownload} 
      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
    >
      <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
      Download
    </button>
  );
};

export default DownloadButton;
