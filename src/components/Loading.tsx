import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-8 border-t-8 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
