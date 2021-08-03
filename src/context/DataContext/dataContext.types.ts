import React from "react";
import { Quiz, QuizScores } from "../../data/data.types";

export type InitialState = {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentQuestion: number;
  score: number;
  userSelectedOptions: string[];
  dashboard: QuizScores[];
};

export type Action =
  | { type: "INITIALIZE_QUIZ"; payload: Quiz[] }
  | {
      type: "INITIALIZE_DASHBOARD";
      payload: { quizName: string; user: string; score: number };
    }
  | { type: "SET_CURRENT_QUIZ"; payload: { quizId: string } }
  | { type: "SET_CURRENT_QUESTION" }
  | { type: "INCREMENT_SCORE"; payload: { points: number; optionId: string } }
  | { type: "DECREMENT_SCORE"; payload: { points: number; optionId: string } }
  | { type: "DECREMENT_SCORE_WITHOUT_SELECTING"; payload: number }
  | { type: "RESET_QUIZ" };

export type DataContextTypes = {
  state: InitialState;
  dispatch: React.Dispatch<Action>;
};
