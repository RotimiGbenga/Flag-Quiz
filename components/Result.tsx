
import React from 'react';
import { PASSING_PERCENTAGE } from '../constants';

interface ResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPass = percentage >= PASSING_PERCENTAGE;

  return (
    <div className="text-center flex flex-col items-center justify-center h-full">
      <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
      <p className="text-xl text-gray-300 mb-2">Your final score is:</p>
      <p className="text-6xl font-bold text-cyan-400 mb-6">{score} / {totalQuestions}</p>
      <div className={`text-2xl font-semibold mb-8 ${isPass ? 'text-green-400' : 'text-red-400'}`}>
        {isPass ? (
          <>
            <span role="img" aria-label="confetti">🎉</span> Congratulations! You passed! <span role="img" aria-label="trophy">🏆</span>
          </>
        ) : (
          <>
            <span role="img" aria-label="thinking-face">🤔</span> Don't worry, try again! <span role="img" aria-label="strong">💪</span>
          </>
        )}
      </div>
      <button
        onClick={onRestart}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg"
      >
        Play Again
      </button>
    </div>
  );
};

export default Result;
