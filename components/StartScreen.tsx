import React from 'react';
import { Difficulty } from '../types';

interface StartScreenProps {
  onStart: (difficulty: Difficulty) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <p className="text-lg text-gray-300 mb-8">
        Choose your difficulty to begin.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => onStart('easy')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg w-48"
        >
          Easy
        </button>
        <button
          onClick={() => onStart('medium')}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg w-48"
        >
          Medium
        </button>
        <button
          onClick={() => onStart('hard')}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg w-48"
        >
          Hard
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
