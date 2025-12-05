import json
import httpx

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import traceback

try:
    from groq import Groq
    GROQ_AVAILABLE = True
except ImportError:
    GROQ_AVAILABLE = False


FALLBACK_QUIZ = {
    "questions": [
        {
            "question": "What does the 'print' function do in Python?",
            "options": ["Displays text", "Adds numbers", "Stores data", "Deletes files"],
            "answer": "Displays text",
            "explanation": "print() outputs text to the console."
        },
        {
            "question": "Which keyword is used to define a function?",
            "options": ["func", "def", "function", "lambda"],
            "answer": "def",
            "explanation": "Python uses 'def' to declare a function."
        }
    ]
}


@api_view(["POST"])
def generate_quiz(request):
    """
    Generate a quiz using Groq AI. Returns fallback if AI fails.
    """
    language = request.data.get("language")
    difficulty = request.data.get("difficulty")

    if not language or not difficulty:
        return Response({"error": "language and difficulty are required"}, status=400)

    api_key = getattr(settings, "GROQ_API_KEY", None)

    if not GROQ_AVAILABLE or not api_key:
        print("Groq not available — using fallback")
        return Response({"source": "fallback", "quiz": FALLBACK_QUIZ})

    # -----------------------------
    # CUSTOM SSL-BYPASS TRANSPORT
    # -----------------------------
    transport = httpx.HTTPTransport(verify=False)
    http_client = httpx.Client(transport=transport)

    client = Groq(api_key=api_key, http_client=http_client)

    # Prompt for AI
    prompt = f"""
    Generate 10 multiple-choice questions on {language} for {difficulty} level.
    Return ONLY valid JSON in this format:
    {{
        "questions": [
            {{
                "question": "string",
                "options": {{
                    "A": "string",
                    "B": "string",
                    "C": "string",
                    "D": "string"
                }},
                "answer": "A",
                "explanation": "string"
            }}
        ]
    }}
    Make the questions short and clear.
    """

    try:

        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        result_text = response.choices[0].message.content
        print("AI Response:", result_text)

        data = json.loads(result_text)
        return Response({"source": "ai", "quiz": data}, status=200)

    except Exception as e:
        print("Error generating quiz:", traceback.format_exc())
        return Response({"source": "fallback", "quiz": FALLBACK_QUIZ})
