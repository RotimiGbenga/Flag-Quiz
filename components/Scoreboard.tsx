import React from 'react';

interface ScoreboardProps {
  score: number;
  currentQuestion: number;
  totalQuestions: number;
  hints: number;
  onPause: () => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ score, totalQuestions, hints, onPause }) => {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
      <div className="flex items-center space-x-2">
        <div className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zM9 20a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z"/>
          </svg>
          <span className="font-bold text-lg text-yellow-400">{hints}</span>
        </div>
      </div>
      <button onClick={onPause} className="bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition-colors" aria-label="Pause game">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
      <div className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md">
        <span className="font-bold text-lg text-cyan-400">{score}</span>
        <span className="text-gray-400"> / {totalQuestions}</span>
      </div>
    </div>
  );
};

export default Scoreboard;