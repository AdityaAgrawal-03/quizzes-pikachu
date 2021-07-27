import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import { useData } from "../../context/DataContext/DataContext";

export function Result() {
  const {
    state: { score, currentQuiz },
  } = useData();
  
  console.log({ currentQuiz });

  const { name, questions } = currentQuiz ?? {
    name: "default quiz",
    questions: [],
  };

  return (
    <>
      <h1> {name} </h1>
      <h2> final score: { score } </h2>
      {questions.map((question) => (
        <QuestionCard key={question._id} item={question} />
      ))}
    </>
  );
}
