from . import views
from django.urls import path
from .api import StudentList, TeacherList, StudentDetail, TeacherDetail, GradesList, StudentGradesDetail, GroupList, \
    UniLoginView, UniUserView, DisciplineScheduleList, DisciplineList, SurveyList, MajorList

urlpatterns = [
    #STUDENTS URLS
    path('api/students', StudentList.as_view()),
    path('api/students/<int:pk>', StudentDetail.as_view()),

    #TEACHERS URLS
    path('api/teachers', TeacherList.as_view()),
    path('api/teachers/<int:pk>', TeacherDetail.as_view()),

    #GRADES URLS
    path('api/grades', GradesList.as_view()),
    path('api/students/grades/<int:pk>', StudentGradesDetail.as_view()),

    #GROUP URLS
    path('api/groups', GroupList.as_view()),

    #AUTH URLS
    path('api/login', UniLoginView.as_view()),
    path('api/user', UniUserView.as_view()),

    #DISCIPLINE URLS
    path('api/discipline_schedule', DisciplineScheduleList.as_view()),
    path('api/discipline', DisciplineList.as_view()),

    #SURVEY URLS
    path('api/survey', SurveyList.as_view()),

    #MAJOR URSL
    path('api/majors', MajorList.as_view()),

]