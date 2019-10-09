from rest_framework.response import Response
from .models import StudentProfile, UniUser, Role, Grade, Group
from rest_framework import generics
from .serializers import StudentProfileSerializer, UniUserSerializerST, UniUserSerializerStGET, \
    TeacherProfileSerializer, UniUserSerializerTE, GradesSerializer, StudentGradeSerializer, GroupSerializer

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
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

'''END GROUPS API'''
