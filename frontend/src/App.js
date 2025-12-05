import React, { useState } from "react";
import QuizSelector from "./components/QuizSelector";
import QuizForm from "./components/QuizForm";
import QuizResult from "./components/QuizResult";
import { fetchQuiz } from "./api/quizApi";

function App() {
  const [stage, setStage] = useState("select"); 
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);

  const startQuiz = async (language, difficulty) => {
    const data = await fetchQuiz(language, difficulty);
    setQuiz(data);
    setAnswers(Array(data.questions.length).fill({ answer: null }));
    setStage("quiz");
  };

  const finishQuiz = () => {
    setStage("result");
  };

  const backToHome = () => {
    setStage("select");
    setQuiz(null);
    setAnswers([]);
  };

  return (
    <>
      {stage === "select" && <QuizSelector onStart={startQuiz} />}
      {stage === "quiz" && (
        <QuizForm
          quiz={quiz}
          answers={answers}
          setAnswers={setAnswers}
          onFinish={finishQuiz}
        />
      )}
      {stage === "result" && (
        <QuizResult quiz={quiz} answers={answers} onBack={backToHome} />
      )}
    </>
  );
}

export default App;
