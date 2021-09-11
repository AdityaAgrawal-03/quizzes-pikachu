import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";
import { QuizCard } from "../../components/QuizCard/QuizCard";

export function Home() {
  const {
    state: { quizzes },
    dispatch,
  } = useData();

  useEffect(() => {
    dispatch({ type: "RESET_QUIZ" });
  }, [dispatch]);

  return (
    <div>
      {quizzes.length === 0 ? (
        <div className="flex justify-center">
          <div className="loader delay-75"></div>
          <div className="loader delay-100"></div>
          <div className="loader delay-150"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center text-white text-xl">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </div>
          <Link to="/dashboard" className="p-4 bg-trueGray-800 rounded-lg text-lg">View Dashboard</Link>
        </div>
      )}
    </div>
  );
}
