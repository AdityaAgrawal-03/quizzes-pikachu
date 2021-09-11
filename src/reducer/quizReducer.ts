import { Action, InitialState } from "../context/DataContext/dataContext.types";
import { Quiz } from "../data/data.types";

export const initialState: InitialState = {
  quizzes: [],
  currentQuiz: null,
  currentQuestion: -1,
  score: 0,
  userSelectedOptions: [],
  dashboard: [],
};

export const quizReducer = (
  state: InitialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case "INITIALIZE_QUIZ":
      return { ...state, quizzes: [...action.payload] };

    case "INITIALIZE_DASHBOARD": 
      return {
         ...state,
         dashboard: [...state.dashboard, { quiz: action.payload.quizName, score: action.payload.score }]
      }

    case "SET_CURRENT_QUIZ":
      const setQuiz = state.quizzes.find(
        (quiz) => quiz._id === action.payload.quizId
      ) as Quiz;
      return { ...state, currentQuiz: setQuiz };

    

    case "SET_CURRENT_QUESTION":
      return { ...state, currentQuestion: state.currentQuestion + 1 };

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
        score: state.score - action.payload,
      };

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
