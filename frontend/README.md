### Quiz App (React + Django)

A lightweight quiz application where users can select language and difficulty, and the Django backend generates quiz questions dynamically using AI.

### Folder Structure (Frontend)
src/
├── api/
│   └── quizApi.js
├── components/
│   ├── BackgroundVideo.js
│   ├── Question.js
│   ├── QuizForm.js
│   ├── QuizResult.js
│   └── QuizSelector.js
├── App.js
├── App.css
├── index.js
└── index.css

### Features

1.  Choose quiz language (Python, JS, etc.)

2.  Set difficulty (Easy / Medium / Hard)

3.  AI-generated questions from backend

4. Multiple-choice questions with explanations

5. Clean, responsive UI using Ant Design

6 Graceful fallback if backend fails

### Tech Stack

### Frontend

- React (CRA or Vite)
- Axios
- Ant Design (UI)
- Render (Hosting)

### Backend

- Django + Django REST Framework

### OpenAI API for question generation

### Setup Instructions
1. Clone Repo
git clone https://github.com/your-username/quiz-app.git
cd quiz-app

2. Install Frontend Dependencies
npm install
npm start

### API Configuration

Your API call lives in: src/api/quizApi.js


### Recommended production setup (avoid localhost in deployed build):

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


1. Create .env in frontend:

REACT_APP_API_URL=https://your-backend.onrender.com/api

2. Running the Backend

Inside your Django project:

python manage.py runserver


3. Ensure your Django endpoint:

POST /api/generate-quiz/

### Deployment

Frontend (Render / Netlify / Vercel)

Add environment variable:

REACT_APP_API_URL = https://your-backend.onrender.com/api

Backend (Render)

Deploy Django app normally

Expose endpoint /api/generate-quiz/

### Components Overview

- QuizSelector.js

Dropdown for selecting language + difficulty.

- QuizForm.js

Handles fetching quiz and navigating through questions.

- Question.js

Displays a single question + options.

- QuizResult.js

Shows score + explanations.

### License

MIT License — free to use!