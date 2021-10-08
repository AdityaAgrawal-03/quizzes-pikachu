import { useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";

export function Dashboard() {
  const {
    state: { dashboard },
  } = useData();

  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      {dashboard.length ? (
        <div className="mt-8">
          {dashboard.map((item) => (
            <div key={item.quiz} className="mb-8">
              <p className="text-center my-4 text-2xl uppercase">{item.quiz}</p>
              <div className="circle">
                <p className="circle-text text-xl">{item.score} / 25</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <button
          className="text-xl m-auto mt-8 bg-green-500 rounded-xl my-4 p-4"
          onClick={() => navigate("/")}
        >
          Play a quiz to view scores!
        </button>
      )}
    </div>
  );
}
