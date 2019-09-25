from . import views
from django.urls import path
from .api import StudentList


urlpatterns = [
    path('api/students', StudentList.as_view()),
    path('api/students/<id>', StudentList.as_view()),
    path('api/students/<id>', StudentList.as_view()),

]