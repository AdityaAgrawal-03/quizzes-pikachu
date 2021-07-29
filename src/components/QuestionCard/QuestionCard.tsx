import { useData } from "../../context/DataContext/DataContext";
import { Question } from "../../data/data.types";

type QuestionCardProps = {
  item: Question;
};

export function QuestionCard({ item }: QuestionCardProps) {
  const {
    state: { userSelectedOptions },
  } = useData();
  const { question, options } = item;

  return (
    <div className="flex flex-col items-center text-lg">
      <div className="rounded-xl shadow-2xl w-1/2 text-xl flex flex-col bg-trueGray-800 p-8 my-10">
        <p className="mb-4"> {question} </p>
        {options?.map((option) => (
          <div key={option._id} className="bg-trueGray-700 my-2 rounded-xl">
            {userSelectedOptions.includes(option._id) ? (
              <p
                className={
                  option?.isRight
                    ? "w-full rounded-xl bg-green-500 p-4"
                    : "w-full rounded-xl bg-red-500 p-4"
                }
              >
                {option?.text}
              </p>
            ) : (
              <p
                className={
                  option?.isRight
                    ? "w-full rounded-xl bg-green-500 p-4"
                    : "w-full p-4"
                }
              >
                {option?.text}
                
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
