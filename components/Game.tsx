import React, { useState, useEffect, useRef } from 'react';
import { Question } from '../types';
import { TOTAL_QUESTIONS } from '../constants';

interface GameProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
  questionNumber: number;
  hintsLeft: number;
  onUseHint: () => void;
  isHintRevealed: boolean;
  isPaused: boolean;
}

const Game: React.FC<GameProps> = ({ question, onAnswer, onNextQuestion, questionNumber, hintsLeft, onUseHint, isHintRevealed, isPaused }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowAnimation(false);
    setShowCorrectAnswer(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const timer = setTimeout(() => {
        setShowAnimation(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [question]);

  useEffect(() => {
    if (isPaused) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else {
      if (isAnswered && !timeoutRef.current) {
        timeoutRef.current = window.setTimeout(() => {
          onNextQuestion();
        }, 1500);
      }
    }
  }, [isPaused, isAnswered, onNextQuestion]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;

    const isCorrect = option === question.correctAnswer;
    setIsAnswered(true);
    setSelectedAnswer(option);
    onAnswer(isCorrect);

    if (!isCorrect) {
      setTimeout(() => {
        setShowCorrectAnswer(true);
      }, 500);
    }
    
    if (!isPaused) {
        timeoutRef.current = window.setTimeout(() => {
            onNextQuestion();
        }, 1500);
    }
  };
  
  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-gray-700 hover:bg-cyan-700';
    }
    
    if (option === selectedAnswer) {
      return option === question.correctAnswer ? 'bg-green-600' : 'bg-red-600';
    }

    if (showCorrectAnswer && option === question.correctAnswer) {
      return 'bg-green-600';
    }
    
    return 'bg-gray-700 opacity-50';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
          <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${(questionNumber / TOTAL_QUESTIONS) * 100}%` }}></div>
      </div>
      <div className={`w-48 h-32 md:w-64 md:h-40 mb-4 p-2 bg-gray-700 rounded-lg shadow-lg flex items-center justify-center transition-all duration-500 ease-out ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {question && <img src={question.flagUrl} alt="Country flag" className="max-w-full max-h-full object-contain" />}
      </div>
      
      <div className="h-12 w-full flex items-center justify-center mb-4">
        {isHintRevealed ? (
            <p className="text-yellow-400 text-lg animate-pulse" aria-live="polite">{question.hint}</p>
        ) : (
            <button
                onClick={onUseHint}
                disabled={hintsLeft === 0}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-md flex items-center space-x-2"
                aria-label={`Use hint, ${hintsLeft} remaining`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 001 1h6a1 1 0 001-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zM9 20a1 1 0 001 1h4a1 1 0 001-1v-1H9v1z"/>
                </svg>
                <span>Hint ({hintsLeft})</span>
            </button>
        )}
      </div>

      <div className="w-full grid grid-cols-1 gap-4">
        {question && question.options.map((option, index) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={`w-full text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform focus:outline-none ${getButtonClass(option)} ${!isAnswered && 'hover:scale-105'} ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${150 + index * 100}ms`}}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;