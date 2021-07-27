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
  console.log({ userSelectedOptions });

  return (
    <div className="flex flex-col items-center text-lg">
      <div className="rounded-xl shadow-2xl bg-gray-200 w-1/2 mx-auto my-4">
        <h2> {question} </h2>
        {options?.map((option) => (
          <div key={option._id}>
            {userSelectedOptions.includes(option._id) ? (
              <p
                className={
                  option?.isRight ? "w-full bg-green-500" : "w-full bg-red-500"
                }
              >
                {option?.text}
              </p>
            ) : (
              <p className={option?.isRight ? "w-full bg-green-500" : "w-full"}>
                {option?.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
