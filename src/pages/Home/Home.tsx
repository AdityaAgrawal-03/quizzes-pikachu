import { useEffect } from "react";
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
        <div className="flex justify-center ">
          <div className="bg-white w-4 h-4 rounded-full transition-all animate-bounce ease-in-out delay-75 mx-2 my-20">
            {" "}
          </div>
          <div className="bg-white w-4 h-4 rounded-full transition-all animate-bounce ease-in-out delay-100 mx-2 my-20">
            {" "}
          </div>
          <div className="bg-white w-4 h-4 rounded-full transition-all animate-bounce ease-in-out delay-150 mx-2 my-20">
            {" "}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-white text-xl">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
}
