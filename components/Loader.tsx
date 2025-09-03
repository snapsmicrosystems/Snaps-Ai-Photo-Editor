
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-2xl">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
      <p className="text-white mt-4 text-lg font-semibold">AI is working its magic...</p>
      <p className="text-slate-400 text-sm">This can take a moment.</p>
    </div>
  );
};

export default Loader;
