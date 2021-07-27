import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { QuizPage } from "./pages/Quiz/Quiz";
import { Result } from "./pages/Result/Result";


function App() {
  return (
    <div className="min-h-screen bg-gray-300">
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/quiz/:quizId" element={<QuizPage />} />
       <Route path="/result" element={<Result />} />
     </Routes>
    </div>
  );
}

export default App;
