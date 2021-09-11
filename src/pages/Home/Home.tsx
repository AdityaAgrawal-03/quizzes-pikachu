import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";
import { QuizCard } from "../../components/QuizCard/QuizCard";

export function Home() {
  const {
    state: { quizzes, dashboard },
    dispatch,
  } = useData();

  console.log({ dashboard });

  useEffect(() => {
    dispatch({ type: "RESET_QUIZ" });
  }, [dispatch]);

  return (
    <div>
      {quizzes.length === 0 ? (
        <div className="flex justify-center ">
          <div className="bg-white w-4 h-4 rounded-full transition-all animate-bounce ease-in-out delay-75 mx-2 my-20"></div>
          <div className="bg-white w-4 h-4 rounded-full transition-all animate-bounce ease-in-out delay-100 mx-2 my-20"></div>
          <div className="bg-white w-4 h-4 rounded-full transition-all animate-bounce ease-in-out delay-150 mx-2 my-20"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center text-white text-xl">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </div>
          <Link to="/dashboard" className="">
            View Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
