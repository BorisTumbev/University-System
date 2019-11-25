import json
from collections import defaultdict
from django.contrib.auth import authenticate
from django.db.models import Count
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from .models import StudentProfile, UniUser, Role, Grade, Group, Discipline, DisciplineSchedule, Survey, Major, \
    SurveyResolveLog
from rest_framework import generics, permissions, status
from .serializers import StudentProfileSerializer, UniUserSerializerST, UniUserSerializerStGET, \
    TeacherProfileSerializer, UniUserSerializerTE, GradesSerializer, StudentGradeSerializer, GroupSerializer, \
    DisciplineSerializer, DisciplineScheduleSerializer, GradesSerializerPost, SurveySerializer, MajorSerializer, \
    SurveyResolveSerializer
from rest_auth.views import LoginView, APIView


'''STUDENTS API'''
class StudentList(generics.ListCreateAPIView):

    serializer_class = UniUserSerializerST
    queryset = UniUser.objects.filter(roles=Role.STUDENT)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UniUserSerializerStGET
        else:
            return UniUserSerializerST

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UniUserSerializerStGET
        else:
            return UniUserSerializerST

    def get_queryset(self):
        user_id = self.kwargs.get('pk', '')

        if user_id:
            resp = UniUser.objects.filter(id=user_id, roles=Role.STUDENT)
        else:
            resp = UniUser.objects.filter(roles=Role.STUDENT)

        return resp

    def delete(self, request, *args, **kwargs):
        # self.destroy(request, *args, **kwargs)
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response({
            "Msg": "Студента е деактивирана успешно."
        })

'''END STUDENTS API'''


'''TEACHERS API'''
class TeacherList(generics.ListCreateAPIView):

    serializer_class = UniUserSerializerTE
    queryset = UniUser.objects.filter(roles=Role.TEACHER)

class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = UniUserSerializerTE

    def get_queryset(self):
        user_id = self.kwargs.get('pk', '')

        if user_id:
            resp = UniUser.objects.filter(id=user_id, roles=Role.TEACHER)
        else:
            resp = UniUser.objects.filter(roles=Role.TEACHER)

        return resp

    def delete(self, request, *args, **kwargs):
        # self.destroy(request, *args, **kwargs)
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response({
            "Msg": "Учителя е деактивирана успешно."
        })
'''END TEACHERS API'''


'''GRADES API'''

class GradesList(generics.ListCreateAPIView):
    # serializer_class = GradesSerializer
    queryset = Grade.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return GradesSerializer
        else:
            return GradesSerializerPost

class StudentGradesDetail(generics.RetrieveUpdateAPIView):
    serializer_class = StudentGradeSerializer
    # queryset = Grade.objects.all()

    def get_queryset(self):
        user_id = self.kwargs.get('pk', '')

        if user_id:
            resp = Grade.objects.filter(student__id=user_id)
        else:
            resp = Grade.objects.all()

        return resp

'''END GRADES API'''

'''GROUPS API'''

class GroupList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = GroupSerializer
    # queryset = Group.objects.all()

    def get_queryset(self):
        major_obj = Major.objects.first()
        major_id = self.kwargs.get('pk', major_obj.id)

        return Group.objects.filter(major=major_id).order_by('name')

'''END GROUPS API'''


'''AUTH API'''
class UniUserView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get_serializer_class(self):
        if hasattr(self.request.user, 'student_profile'):
             return UniUserSerializerStGET
        elif hasattr(self.request.user, 'teacher_profile'):
            return UniUserSerializerTE

    def get_object(self):
        return self.request.user


class UniLoginView(LoginView):

    def get_response(self):
        orginal_response = super().get_response()

        user_data = {}
        if hasattr(self.user, 'student_profile'):
            user_data ={'user': UniUserSerializerStGET(self.user).data}
        elif hasattr(self.user, 'teacher_profile'):
            user_data ={'user': UniUserSerializerTE(self.user).data}

        orginal_response.data.update(user_data)

        return orginal_response


'''END AUTH API'''

'''DISCIPLINE API'''

class DisciplineScheduleList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = DisciplineScheduleSerializer

    def get_queryset(self):
        major_obj = Major.objects.first()
        major_id = self.kwargs.get('major_pk', major_obj.id)

        return DisciplineSchedule.objects.filter(group__major=major_id)

class DisciplineList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = DisciplineSerializer
    queryset = Discipline.objects.all()

'''END DISCIPLINE API'''

'''SURVEY API'''

class SurveyList(generics.ListCreateAPIView):
    # permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = SurveySerializer
    queryset = Survey.objects.all()

class SurveyDetail(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = SurveySerializer

    def get_queryset(self):
        survey_id = self.kwargs.get('pk', '')
        log = SurveyResolveLog.objects.filter(user = self.request.user, survey__id = survey_id)
        q = Survey.objects.none()

        if not log:
            q = Survey.objects.filter(id = survey_id, major = self.request.user.student_profile.group.major)

        return q

class SurveyResolve(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = SurveyResolveSerializer
    queryset = SurveyResolveLog.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = SurveyResolveSerializer(data=request.data, many=isinstance(request.data, list))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SurveyResolveDetail(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, pk):
        q_set = list(SurveyResolveLog.objects.filter(survey__id=pk).values('answer__title', 'question__title', 'survey__title')
                 .annotate(answ_count=Count('answer')).order_by('question'))

        question_dict = defaultdict(list)

        for q in q_set:
            question_dict[q['question__title']].append(q)

        return JsonResponse(dict(question_dict), safe=False)


'''END SURVEY API'''

'''MAJOR API'''

class MajorList(generics.ListCreateAPIView):
    serializer_class = MajorSerializer
    queryset = Major.objects.all()

'''MAJOR API'''