from . import views
from django.urls import path
from .api import StudentList, TeacherList, StudentDetail, TeacherDetail, GradesList

urlpatterns = [
    #STUDENTS URLS
    path('api/students', StudentList.as_view()),
    path('api/students/<int:pk>', StudentDetail.as_view()),

    #TEACHERS URLS
    path('api/teachers', TeacherList.as_view()),
    path('api/teachers/<int:pk>', TeacherDetail.as_view()),

    #GRADES URLS
    path('api/grades', GradesList.as_view()),

]