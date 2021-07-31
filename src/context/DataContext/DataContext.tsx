import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import { initialState, quizReducer } from "../../reducer/quizReducer";
import { DataContextTypes } from "./dataContext.types";

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
