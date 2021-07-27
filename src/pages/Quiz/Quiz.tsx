import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";

export function QuizPage() {
  const navigate = useNavigate();

  const { quizId } = useParams();
  const {
    state: { score, currentQuestion, currentQuiz },
    dispatch,
  } = useData();

  useEffect(() => {
    console.log("testing");
    dispatch({ type: "SET_CURRENT_QUIZ", payload: { quizId: quizId } });
  }, [quizId, dispatch]);

  const { name, questions } = currentQuiz ?? {
    name: "default quiz",
    questions: [],
  };

  return (
    <div className="flex flex-col items-center">
      {currentQuestion < 0 ? (
        <button onClick={() => dispatch({ type: "SET_CURRENT_QUESTION" })}>
          Start Quiz
        </button>
      ) : (
        <>
          <h1> {name} </h1>
          <div className="rounded-xl shadow-2xl w-1/2 my-64 text-xl flex flex-col p-4">
            <p> Score: {score} </p>
            <p>{questions[currentQuestion].question}</p>
            {questions[currentQuestion].options.map((option) => (
              <div key={option._id} className="bg-gray-200 p-3 my-2 rounded-xl">
                <button
                  className={
                    option.isRight
                      ? "w-full focus:bg-green-500"
                      : "w-full focus:bg-red-500"
                  }
                  onClick={() => {
                    dispatch({
                      type: "CHECK_OPTION",
                      payload: {
                        quizId: quizId,
                        questionId: questions[currentQuestion]._id,
                        optionId: option._id,
                      },
                    });

                    if (currentQuestion === questions.length - 1) {
                      navigate("/result");
                    } else {
                      dispatch({ type: "SET_CURRENT_QUESTION" });
                    }
                  }}
                >
                  <p> {option.text} </p>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
