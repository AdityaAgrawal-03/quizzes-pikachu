import React from "react";
import { Quiz } from "../../data/data.types";

export type InitialState = {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentQuestion: number;
  score: number;
  userSelectedOptions: string[];
  finalScore: number
};

export type Action =
  | { type: "INITIALIZE_QUIZ"; payload: Quiz[] }
  | { type: "SET_CURRENT_QUIZ"; payload: { quizId: string } }
  | { type: "SET_CURRENT_QUESTION" }
  | {
      type: "CHECK_OPTION";
      payload: { quizId: string; questionId: string; optionId: string };
    };

export type DataContextTypes = {
  state: InitialState;
  dispatch: React.Dispatch<Action>;
};
