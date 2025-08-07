import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500 select-none">
        <p>
          &copy; {new Date().getFullYear()} Swagosaur. All rights reserved. Simplifying API testing with AI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
