from .models import StudentProfile
from rest_framework import generics
from .serializers import StudentProfileSerializer, UniUserSerializer

class StudentList(generics.ListCreateAPIView):
    queryset = StudentProfile.objects.all()
    serializer_class = UniUserSerializer

