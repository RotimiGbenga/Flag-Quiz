import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import Result from './components/Result';
import Scoreboard from './components/Scoreboard';
import PauseScreen from './components/PauseScreen';
import { generateQuiz } from './services/gameService';
import { Question, Difficulty } from './types';
import { TOTAL_QUESTIONS, HINTS_PER_GAME } from './constants';

type GameState = 'start' | 'playing' | 'finished';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hints, setHints] = useState(HINTS_PER_GAME);
  const [usedHints, setUsedHints] = useState<Set<number>>(new Set());
  const [isPaused, setIsPaused] = useState(false);

  const startGame = useCallback((difficulty: Difficulty) => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuestions(generateQuiz(difficulty));
    setHints(HINTS_PER_GAME);
    setUsedHints(new Set());
    setIsPaused(false);
    setGameState('playing');
  }, []);

  const handleAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setGameState('finished');
    }
  }, [currentQuestionIndex]);

  const handleUseHint = useCallback(() => {
    if (hints > 0 && !usedHints.has(currentQuestionIndex)) {
        setHints(prev => prev - 1);
        setUsedHints(prev => new Set(prev).add(currentQuestionIndex));
    }
  }, [hints, usedHints, currentQuestionIndex]);
  
  const restartGame = useCallback(() => {
    setGameState('start');
  }, []);

  const handlePause = useCallback(() => {
    if (gameState === 'playing') {
      setIsPaused(true);
    }
  }, [gameState]);

  const handleResume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const renderGameState = () => {
    switch (gameState) {
      case 'playing':
        return (
          <>
            <Scoreboard 
              score={score} 
              currentQuestion={currentQuestionIndex + 1} 
              totalQuestions={TOTAL_QUESTIONS}
              hints={hints}
              onPause={handlePause}
            />
            <Game
              question={questions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              onNextQuestion={handleNextQuestion}
              questionNumber={currentQuestionIndex + 1}
              hintsLeft={hints}
              onUseHint={handleUseHint}
              isHintRevealed={usedHints.has(currentQuestionIndex)}
              isPaused={isPaused}
            />
          </>
        );
      case 'finished':
        return <Result score={score} totalQuestions={TOTAL_QUESTIONS} onRestart={restartGame} />;
      case 'start':
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans relative">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-cyan-400">
          Guess the Flag!
        </h1>
        <p className="text-center text-gray-400 mb-8">How well do you know the world's flags?</p>
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 pt-20 min-h-[450px] flex flex-col justify-center relative">
            {renderGameState()}
            {isPaused && <PauseScreen onResume={handleResume} />}
        </div>
      </div>
    </div>
  );
};

export default App;