import { Link } from "react-router-dom";
import { Quiz } from "../../data/data.types";

type QuizCardProps = {
  quiz: Quiz;
};

export function QuizCard({ quiz }: QuizCardProps) {
 
  const { _id, name, coverImage } = quiz;
  return (
    <>
      <Link to={`/quiz/${_id}`}>
        <div className="border-6 rounded-2xl w-96 h-80 bg-gray-200 flex flex-col">
          <img
            src={coverImage}
            alt="quiz-cover"
            className="object-cover w-full h-4/5"
          />
          <h3> {name} </h3>
        </div>
      </Link>
    </>
  );
}
