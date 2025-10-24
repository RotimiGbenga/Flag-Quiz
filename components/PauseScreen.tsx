import React from 'react';

interface PauseScreenProps {
  onResume: () => void;
}

const PauseScreen: React.FC<PauseScreenProps> = ({ onResume }) => {
  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center z-20 rounded-xl">
      <h2 className="text-5xl font-bold text-cyan-400 mb-8 animate-pulse">Paused</h2>
      <button
        onClick={onResume}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-10 rounded-lg text-2xl transition-transform transform hover:scale-105 shadow-lg"
      >
        Resume
      </button>
    </div>
  );
};

export default PauseScreen;
