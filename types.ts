export interface Country {
  name: string;
  code: string;
  continent: string;
}

export interface Question {
  flagUrl: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';
