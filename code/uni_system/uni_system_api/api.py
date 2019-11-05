from django.contrib.auth import authenticate
from rest_framework.response import Response
from .models import StudentProfile, UniUser, Role, Grade, Group, Discipline, DisciplineSchedule
from rest_framework import generics, permissions
from .serializers import StudentProfileSerializer, UniUserSerializerST, UniUserSerializerStGET, \
    TeacherProfileSerializer, UniUserSerializerTE, GradesSerializer, StudentGradeSerializer, GroupSerializer, \
    DisciplineSerializer, DisciplineScheduleSerializer
from rest_auth.views import LoginView


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
    serializer_class = GradesSerializer
    queryset = Grade.objects.all()

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

        if hasattr(self.request.user, 'student_profile'):
            major = self.request.user.student_profile.group.major
        elif hasattr(self.request.user, 'teacher_profile'):
            major = self.request.user.teacher_profile.group.major

        return Group.objects.filter(major=major).order_by('name')
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
        if hasattr(self.request.user, 'student_profile'):
            user_major = self.request.user.student_profile.group.major
        elif hasattr(self.request.user, 'teacher_profile'):
            user_major = self.request.user.teacher_profile.group.major

        return DisciplineSchedule.objects.filter(group__major=user_major)

class DisciplineList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = DisciplineSerializer
    queryset = Discipline.objects.all()


'''END DISCIPLINE API'''