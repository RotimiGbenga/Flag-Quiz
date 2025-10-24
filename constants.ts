import { Difficulty } from "./types";

export const TOTAL_QUESTIONS = 20;
export const PASSING_PERCENTAGE = 70;
export const HINTS_PER_GAME = 3;

export const OPTIONS_PER_QUESTION: Record<Difficulty, number> = {
    easy: 2,
    medium: 3,
    hard: 4,
};
