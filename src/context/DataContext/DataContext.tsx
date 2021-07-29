import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Options, Question, Quiz } from "../../data/data.types";
import { Action, DataContextTypes, InitialState } from "./dataContext.types";

const initialState: InitialState = {
  quizzes: [],
  currentQuiz: null,
  currentQuestion: -1,
  score: 0,
  userSelectedOptions: [],
};

const quizReducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "INITIALIZE_QUIZ":
      return { ...state, quizzes: [...action.payload] };

    case "SET_CURRENT_QUIZ":
      const setQuiz = state.quizzes.find(
        (quiz) => quiz._id === action.payload.quizId
      ) as Quiz;
      return { ...state, currentQuiz: setQuiz };

    case "SET_CURRENT_QUESTION":
      return { ...state, currentQuestion: state.currentQuestion + 1 };

    case "CHECK_OPTION":
      const quiz = state?.quizzes.find(
        (quiz) => quiz._id === action.payload.quizId
      ) as Quiz;
      const question = quiz.questions.find(
        (question) => question._id === action.payload.questionId
      ) as Question;
      const option = question.options.find(
        (option) => option._id === action.payload.optionId
      ) as Options;
      if (option.isRight) {
        return {
          ...state,
          score: state.score + question.points,
          userSelectedOptions: [
            ...state.userSelectedOptions,
            action.payload.optionId,
          ],
        };
      }
      return {
        ...state,
        score: state.score - question.negativePoints,
        userSelectedOptions: [
          ...state.userSelectedOptions,
          action.payload.optionId,
        ],
      };

    case "INCREMENT_SCORE":
      return {
        ...state,
        score: state.score + action.payload.points,
        userSelectedOptions: [
          ...state.userSelectedOptions,
          action.payload.optionId,
        ],
      };

    case "DECREMENT_SCORE":
      return {
        ...state,
        score: state.score - action.payload.points,
        userSelectedOptions: [
          ...state.userSelectedOptions,
          action.payload.optionId,
        ],
      };

  case "DECREMENT_SCORE_WITHOUT_SELECTING": 
      return {
        ...state,
        score: state.score - action.payload
      }

    case "RESET_QUIZ":
      return {
        ...state,
        currentQuiz: null,
        userSelectedOptions: [],
        score: 0,
        currentQuestion: -1,
      };

    default:
      return { ...state };
  }
};

export const DataContext = createContext<DataContextTypes>({
  state: initialState,
  dispatch: () => null,
});

export type DataProviderProps = {
  children: React.ReactNode;
};

export function DataProvider({ children }: DataProviderProps) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { success, quizzes },
        } = await axios.get("https://quiz-backend.aditya365.repl.co/quiz");
        console.log({ quizzes });
        if (success) {
          dispatch({ type: "INITIALIZE_QUIZ", payload: quizzes });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
