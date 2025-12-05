from django.urls import path
from .views import generate_quiz

urlpatterns = [
 path('generate-quiz/', generate_quiz, name='generate_quiz'),   
]