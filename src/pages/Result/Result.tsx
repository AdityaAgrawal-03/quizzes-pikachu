import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import { useData } from "../../context/DataContext/DataContext";

export function Result() {
  const {
    state: { score, currentQuiz },
  } = useData();
  const navigate = useNavigate();

  const { name, questions, totalPoints } = currentQuiz ?? {
    name: "default quiz",
    questions: [],
    totalPoints: 25,
  };

  useEffect(() => {
    currentQuiz === null && navigate("/");
  }, [currentQuiz, navigate]);

  return (
    <div className="flex flex-col justify-center">
      <div className="text-2xl text-center mt-8 uppercase">
        <h1> {name} </h1>
        <h2>
          {" "}
          Final Score: {score} / {totalPoints}{" "}
        </h2>
      </div>

      {questions.map((question) => (
        <QuestionCard key={question._id} item={question} />
      ))}
    </div>
  );
}
