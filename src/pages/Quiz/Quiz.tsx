import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";
import { createTimer } from "../../utils/timer";
import { Options } from "../../data/data.types";

export function QuizPage() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [attempt, setAttempt] = useState(false);

  const {
    state: { score, currentQuestion, currentQuiz },
    dispatch,
  } = useData();

  const { seconds, restart, pause } = useTimer({
    expiryTimestamp: createTimer(),
    onExpire: () => {
      currentQuestion >= 0 && checkOptionWithoutSelecting(false);
    },
  });

  const { name, questions, totalQuestions } = currentQuiz ?? {
    name: "default quiz",
    questions: [],
    totalQuestions: 5,
  };

  const quizInfo = [
    "This quiz contains total 5 questions",
    "Each question carries 5 marks for correct answer and -2 marks for wrong answer",
  ];

  const checkOption = (option: Options) => {
    option?.isRight
      ? dispatch({
          type: "INCREMENT_SCORE",
          payload: {
            points: questions[currentQuestion].points,
            optionId: option._id,
          },
        })
      : dispatch({
          type: "DECREMENT_SCORE",
          payload: {
            points: questions[currentQuestion].negativePoints,
            optionId: option._id,
          },
        });
    setAttempt(true);
    pause();
  };

  const checkOptionWithoutSelecting = (isRight: boolean) => {
    console.log("checking");
    !isRight &&
      dispatch({
        type: "DECREMENT_SCORE_WITHOUT_SELECTING",
        payload: questions[currentQuestion].negativePoints,
      });
    setAttempt(true);
    pause();
  };

  useEffect(() => {
    dispatch({ type: "SET_CURRENT_QUIZ", payload: { quizId: quizId } });
  }, [dispatch, quizId]);

  return (
    <div className="flex flex-col items-center justify-center text-white text-xl">
      {currentQuestion < 0 ? (
        <div className="rounded-xl shadow-2xl w-1/2 text-xl flex flex-col bg-trueGray-800 p-8 my-20">
          <p className="text-center uppercase text-2xl tracking-wide mb-4">
            {name}
          </p>
          <>
            {quizInfo.map((info) => (
              <div className="flex my-2">
                <span className="material-icons-outlined mr-4">info</span>
                <p key={info}> {info} </p>
              </div>
            ))}
          </>

          <button
            className="bg-green-500 rounded-xl my-4 p-4 uppercase"
            onClick={() => {
              dispatch({ type: "SET_CURRENT_QUESTION" });
              restart(createTimer());
            }}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <>
          <h1 className="uppercase text-center font-bold text-2xl tracking-wide my-4">
            {seconds}
          </h1>
          <div className="rounded-xl shadow-2xl w-1/2 text-xl flex flex-col bg-trueGray-800 p-8 my-20">
            <div className="my-4 flex justify-between">
              <p>
                Question: {currentQuestion + 1} / {totalQuestions}
              </p>
              <p> Score: {score} </p>
            </div>
            <p className="mb-4">
              {currentQuiz?.questions[currentQuestion]?.question}
            </p>

            {currentQuiz?.questions[currentQuestion]?.options.map((option) => (
              <div key={option._id} className="bg-trueGray-700 my-2 rounded-xl">
                <button
                  className={
                    attempt
                      ? option.isRight
                        ? "w-full bg-green-500 rounded-xl focus:bg-green-500 focus:rounded-xl p-4"
                        : "w-full bg-red-500 rounded-xl focus:bg-red-500 focus:rounded-xl p-4"
                      : "w-full p-4"
                  }
                  onClick={() => checkOption(option)}
                >
                  <p> {option.text} </p>
                </button>
              </div>
            ))}
            <button
              disabled={!attempt}
              className={
                attempt
                  ? "bg-green-500 rounded-2xl p-4 uppercase mt-4"
                  : "rounded-2xl p-4 uppercase cursor-not-allowed bg-trueGray-700 mt-4"
              }
              onClick={() => {
                if (currentQuestion === questions.length - 1) {
                  navigate("/result", { replace: true });
                } else {
                  restart(createTimer());
                  setAttempt(false);
                  dispatch({ type: "SET_CURRENT_QUESTION" });
                }
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
