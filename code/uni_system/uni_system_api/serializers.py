from rest_framework import serializers
from .utils import gen_student_num
from .models import UniUser, StudentProfile, Role, TeacherProfile, Grade


'''STUDENT SERIALIZERS'''
class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ('id', 'qualification_type', 'group', 'faculty', 'semester')

class StudentProfileSerializerGET(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ('id', 'student_num', 'qualification_type', 'group', 'faculty', 'semester')


class UniUserSerializerST(serializers.ModelSerializer):
    student_profile = StudentProfileSerializer()

    class Meta:
        model = UniUser
        fields = ('id', 'student_profile', 'password', 'is_superuser', 'username', 'first_name', 'last_name', 'surname', 'email')

    def create(self, validated_data):
        student_data = validated_data.pop('student_profile')
        password = validated_data.pop('password')
        user_obj = UniUser(**validated_data)
        user_obj.set_password(password)
        user_obj.save()

        role_obj, _ = Role.objects.get_or_create(id=Role.STUDENT)
        user_obj.roles.add(role_obj.id)
        st_obj = StudentProfile(user=user_obj, student_num=gen_student_num(student_data['faculty']), **student_data)
        st_obj.save()

        return user_obj

    def update(self, instance, validated_data):

        user_obj = instance
        st_obj = instance.student_profile

        student_data = validated_data.pop('student_profile')
        password = validated_data.pop('password')
        user_data = validated_data

        StudentProfile.objects.filter(id=st_obj.id).update(**student_data)

        user_obj.set_password(password)
        user_obj.save()
        UniUser.objects.filter(id=user_obj.id).update(**user_data)

        return user_obj

class UniUserSerializerStGET(serializers.ModelSerializer):
    student_profile = StudentProfileSerializerGET()

    class Meta:
        model = UniUser
        fields = ('id', 'student_profile', 'is_superuser', 'username', 'first_name', 'last_name', 'surname', 'email')

'''END STUDENT SERIALIZERS'''


'''TEACHER SERIALIZERS'''
class TeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = ('id', 'faculty', 'groups')

class UniUserSerializerTE(serializers.ModelSerializer):
    teacher_profile = TeacherProfileSerializer()

    class Meta:
        model = UniUser
        fields = ('id', 'teacher_profile', 'password', 'is_superuser', 'username', 'first_name', 'last_name', 'surname', 'email')

    def create(self, validated_data):
        teacher_data = validated_data.pop('teacher_profile')
        password = validated_data.pop('password')
        groups = teacher_data.pop('groups')
        user_obj = UniUser(**validated_data)
        user_obj.set_password(password)
        user_obj.save()

        role_obj, _ = Role.objects.get_or_create(id=Role.TEACHER)
        user_obj.roles.add(role_obj.id)
        te_obj = TeacherProfile(user=user_obj, **teacher_data)
        te_obj.save()
        for g in groups:
            te_obj.groups.add(g)

        return user_obj

    def update(self, instance, validated_data):

        user_obj = instance
        te_obj = instance.teacher_profile

        teacher_data = validated_data.pop('teacher_profile')
        password = validated_data.pop('password')
        groups = teacher_data.pop('groups')
        user_data = validated_data

        for g in groups:
            te_obj.groups.add(g)

        TeacherProfile.objects.filter(id=te_obj.id).update(**teacher_data)

        user_obj.set_password(password)
        user_obj.save()
        UniUser.objects.filter(id=user_obj.id).update(**user_data)

        return user_obj

'''END TEACHER SERIALIZERS'''


'''GRADES SERIALIZERS'''

class GradesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('id', 'discipline', 'grade', 'student')


'''END GRADES SERIALIZERS'''