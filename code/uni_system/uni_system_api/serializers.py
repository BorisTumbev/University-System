from rest_framework import serializers
from .models import UniUser, StudentProfile

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = '__all__'

class UniUserSerializer(serializers.ModelSerializer):

    student_serializer = StudentProfileSerializer()

    class Meta:
        model = UniUser
        fields = ('student_serializer', 'password', 'is_superuser', 'username', 'first_name', 'last_name', 'surname', 'email', 'roles')

    def create(self, validated_data):
        student_data = validated_data.pop('student_serializer')
        print(validated_data)
        print('kurqqqq')
        print(student_data)