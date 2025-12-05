import axios from "axios";

export const fetchQuiz = async (language, difficulty) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/generate-quiz/", {
      language,
      difficulty,
    });
    return res.data.quiz;
  } catch (err) {
    console.error("Failed to fetch quiz:", err);
    return {
      questions: [
        {
          question: "Fallback: What does print() do?",
          options: ["Display text", "Add numbers", "Store data", "Delete files"],
          answer: "Display text",
          explanation: "print() outputs text to the console.",
        },
      ],
    };
  }
};
