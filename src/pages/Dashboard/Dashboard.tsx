import { useData } from "../../context/DataContext/DataContext";

export function Dashboard() {
  const {
    state: { dashboard },
  } = useData();

  return (
    <div>
      {dashboard.map((item) => (
        <div>
          <p> {item.quiz} </p>
          {item.scores.map((score) => (
            <div>
              <p> {score.user} </p>
              <p> {score.score} </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
