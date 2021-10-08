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
        <div className="border-6 rounded-2xl max-w-lg h-1/4 m-20 bg-trueGray-800 flex flex-col">
          <img
            src={coverImage}
            alt="quiz-cover"
            className="object-cover w-full h-4/5 rounded-t-2xl"
          />
          <div className="flex justify-between p-4 text-center uppercase">
            <h3> {name} </h3>
          </div>
        </div>
      </Link>
    </>
  );
}
