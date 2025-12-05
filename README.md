🎯 Quiz App (React + Django)

A lightweight quiz application where users can select language and difficulty, and the Django backend generates quiz questions dynamically using AI.

📁 Folder Structure (Frontend)
src/
├── api/
│   └── quizApi.js
├── components/
│   ├── Question.js
│   ├── QuizForm.js
│   ├── QuizResult.js
│   └── QuizSelector.js
├── App.js
├── App.css
├── index.js
└── index.css

🚀 Features

- Choose quiz language (Python, JS, etc.)

- Set difficulty (Easy / Medium / Hard)

- AI-generated questions from backend

- Multiple-choice questions with explanations

- Clean, responsive UI using Ant Design

- Graceful fallback if backend fails

🛠️ Tech Stack

Frontend
- React (antd)
- Axios
- Ant Design (UI)
- Render (Hosting)

Backend

- Django + Django REST Framework

OpenAI API for question generation

🔧 Setup Instructions
1. Clone Repo
git clone https://github.com/your-username/quiz-app.git
cd quiz-app

2. Install Frontend Dependencies
npm install
npm start

🔗 API Configuration

Your API call lives in:

src/api/quizApi.js


Recommended production setup (avoid localhost in deployed build):

const BASE_URL = process.env.REACT_APP_API_URL;

export const fetchQuiz = async (language, difficulty) => {
  try {
    const response = await axios.post(`${BASE_URL}/generate-quiz/`, {
      language, difficulty
    });
    return response.data.quiz;
  } catch (err) {
    console.error("Failed to fetch quiz:", err);
    return fallbackQuiz();
  }
};


Create .env in frontend:

REACT_APP_API_URL=https://your-backend.onrender.com/api

▶️ Running the Backend

Inside your Django project:

python manage.py runserver

Ensure your Django endpoint:

POST /api/generate-quiz/

🚀 Deployment
Frontend (Render / Netlify / Vercel)

Add environment variable:

REACT_APP_API_URL = https://your-backend.onrender.com/api

Backend (Render)

Deploy Django app normally

Expose endpoint /api/generate-quiz/

🧩 Components Overview

QuizSelector.js - Dropdown for selecting language + difficulty.

QuizForm.js - Handles fetching quiz and navigating through questions.

Question.js - Displays a single question + options.

QuizResult.js - Shows score + explanations.

📝 License

MIT License — free to use!
