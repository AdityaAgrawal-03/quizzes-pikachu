import { useData } from "../../context/DataContext/DataContext";

export function Dashboard() {
  const {
    state: { dashboard },
  } = useData();

  return (
    <div className="flex justify-center">
      {dashboard.length ? (
        <div className="mt-8">
          {dashboard.map((item) => (
            <div key={item.quiz} className="mb-8">
              <p className="text-center my-4 text-2xl uppercase"> {item.quiz} </p> 
              <div className="circle">
                <p className="circle-text text-xl">{item.score} / 25</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl m-auto mt-8"> Play a quiz to view scores! </p>
      )}
    </div>
  );
}
