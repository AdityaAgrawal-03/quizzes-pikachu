import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import { useData } from "../../context/DataContext/DataContext";

export function Result() {
  const {
    state: { score, currentQuiz, userSelectedOptions },
    dispatch,
  } = useData();
  const location = useLocation();
  console.log("from location", { location });

  const { name, questions, totalPoints, totalQuestions } = currentQuiz ?? {
    name: "default quiz",
    questions: [],
    totalPoints: 25,
    totalQuestions: 5,
  };

  useEffect(() => {
    dispatch({
      type: "INITIALIZE_DASHBOARD",
      payload: {
        quizName: currentQuiz?.name as string,
        score: score,
      },
    });
  }, [dispatch, score, currentQuiz?.name]);


  return (
    <div className="flex flex-col justify-center text-2xl text-center">
      <h1 className="uppercase my-8 text-3xl"> {name} </h1>
      <div className="mx-auto flex mt-4 uppercase">
        <div className="mr-4">
          <div className="circle">
            <p className="circle-text">
              {score} / {totalPoints}
            </p>
          </div>
          <p className="mt-4">final score</p>
        </div>

        <div className="ml-4">
          <div className="circle">
            <p className="circle-text">
              {userSelectedOptions.length} / {totalQuestions}
            </p>
          </div>
          <p className="mt-4">Attempted</p>
        </div>
      </div>

      {questions.map((question) => (
        <QuestionCard key={question._id} item={question} />
      ))}
    </div>
  );
}
