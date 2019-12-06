from . import views
from django.urls import path
from .api import StudentList, TeacherList, StudentDetail, TeacherDetail, GradesList, StudentGradesDetail, GroupList, \
    UniLoginView, UniUserView, DisciplineScheduleList, DisciplineList, SurveyList, MajorList, SurveyDetail, \
    SurveyResolve, SurveyResolveDetail, SurveyToResolveDetail, sendEmailToGroup, ResetPassword, ResetPasswordConfirm, \
    DisciplineModelScheduleList, DisciplineModelScheduleDetails, GroupDetails, DisciplineDetails
from rest_auth.views import LogoutView

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
    path('api/groups/<pk>', GroupList.as_view()),
    path('api/groups', GroupList.as_view()),
    path('api/group/<int:pk>', GroupDetails.as_view()),

    #AUTH URLS
    path('api/login', UniLoginView.as_view()),
    path('api/logout', LogoutView.as_view()),
    path('api/reset-pass', ResetPassword.as_view()),
    path('api/reset-pass/<token>', ResetPasswordConfirm.as_view()),
    path('api/user', UniUserView.as_view()),

    #DISCIPLINE URLS
    path('api/discipline_schedule/<int:major_pk>', DisciplineScheduleList.as_view()),
    path('api/discipline_schedule', DisciplineScheduleList.as_view()),
    path('api/discipline_model_schedule', DisciplineModelScheduleList.as_view()),
    path('api/discipline_model_schedule/<int:pk>', DisciplineModelScheduleDetails.as_view()),
    path('api/discipline', DisciplineList.as_view()),
    path('api/discipline/<int:pk>', DisciplineDetails.as_view()),

    #SURVEY URLS
    path('api/survey', SurveyList.as_view()),
    path('api/survey/<int:pk>', SurveyDetail.as_view()),
    path('api/survey/resolve/<int:pk>', SurveyToResolveDetail.as_view()),
    path('api/survey/log', SurveyResolve.as_view()),
    path('api/survey/log/details/<int:pk>', SurveyResolveDetail.as_view()),
    path('api/survey/log/details', SurveyResolveDetail.as_view()),

    #MAJOR URLS
    path('api/majors', MajorList.as_view()),

    #EMAILS URLS
    path('api/email/group/<int:group_id>', sendEmailToGroup),

]