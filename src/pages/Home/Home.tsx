import { useState } from "react";
import { useData } from "../../context/DataContext/DataContext";
import { QuizCard } from "../../components/QuizCard/QuizCard";

export function Home() {
  const [loader, setLoader] = useState("loading");
  const {
    state: { quizzes },
  } = useData();

  console.log({ quizzes });

  return (
    <div className="flex justify-center items-center space-x-20">
      {quizzes.length === 0 ? (
        <h1> {loader}... </h1>
      ) : (
        <>
          {quizzes.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))}
        </>
      )}
    </div>
  );
}
