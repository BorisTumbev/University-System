from rest_framework import serializers
from .utils import gen_student_num, WEEKDAYS
from .models import UniUser, StudentProfile, Role, TeacherProfile, Grade, Group, Discipline, DisciplineSchedule, Major, \
    Survey, Question, Answer, SurveyResolveLog

'''MAJOR SERIALIZERS'''
class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = ('id', 'name')

'''END MAJOR SERIALIZERS'''

'''GROUP SERIALIZERS'''

class GroupSerializer(serializers.ModelSerializer):
    major = MajorSerializer()
    class Meta:
        model = Group
        fields = ('id', 'name', 'major')

'''END GROUP SERIALIZERS'''

'''STUDENT SERIALIZERS'''
class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ('id', 'qualification_type', 'group', 'faculty', 'semester')

class StudentProfileSerializerGET(serializers.ModelSerializer):
    group = GroupSerializer()
    class Meta:
        model = StudentProfile
        fields = ('id', 'student_num', 'qualification_type', 'group', 'faculty', 'semester')


class UniUserSerializerST(serializers.ModelSerializer):
    student_profile = StudentProfileSerializer()

    class Meta:
        model = UniUser
        fields = ('id', 'student_profile', 'password', 'is_superuser', 'username', 'first_name', 'last_name', 'surname',
                  'email', 'is_active')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.context['request'].method == "PUT":
            self.fields.pop('password')

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
        if 'password' in validated_data:
            password = validated_data.pop('password')
            user_obj.set_password(password)
            user_obj.save()

        user_data = validated_data

        StudentProfile.objects.filter(id=st_obj.id).update(**student_data)

        UniUser.objects.filter(id=user_obj.id).update(**user_data)

        return user_obj

class UniUserSerializerStGET(serializers.ModelSerializer):
    student_profile = StudentProfileSerializerGET()
    grades = serializers.SerializerMethodField()

    class Meta:
        model = UniUser
        fields = ('id', 'student_profile','grades' , 'is_superuser', 'username', 'first_name', 'last_name', 'surname',
                  'email', 'is_active')

    def get_grades(self, obj):
        return GradesSerializer(obj.student_profile.st_grades.all(), many=True).data

'''END STUDENT SERIALIZERS'''


'''TEACHER SERIALIZERS'''
class TeacherProfileSerializer(serializers.ModelSerializer):
    # groups = GroupSerializer(many=True)
    class Meta:
        model = TeacherProfile
        fields = ('id', 'faculty', 'groups')

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     print(self.context)


class UniUserSerializerTE(serializers.ModelSerializer):
    teacher_profile = TeacherProfileSerializer()

    class Meta:
        model = UniUser
        fields = ('id', 'teacher_profile', 'password', 'is_superuser', 'username', 'first_name', 'last_name', 'surname', 'email')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # self.fields['teacher_profile'].context.update(self.context)
        # print(self.fields['teacher_profile'].context)
        if self.context['request'].method == "PUT" or self.context['request'].method == "GET":
            self.fields.pop('password')


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
        groups = teacher_data.pop('groups')

        if 'password' in validated_data:
            password = validated_data.pop('password')
            user_obj.set_password(password)
            user_obj.save()

        user_data = validated_data

        for g in groups:
            te_obj.groups.add(g)

        TeacherProfile.objects.filter(id=te_obj.id).update(**teacher_data)

        UniUser.objects.filter(id=user_obj.id).update(**user_data)

        return user_obj

'''END TEACHER SERIALIZERS'''

'''DISCIPLINE SERIALIZERS'''

class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ('id', 'name', 'faculty', 'semester')

class DisciplineScheduleSerializer(serializers.ModelSerializer):
    # discipline = DisciplineSerializer()
    resourceId = serializers.SerializerMethodField()
    title      = serializers.SerializerMethodField()
    resizable  = serializers.ReadOnlyField(default=False)
    movable    = serializers.ReadOnlyField(default=False)
    bgColor    = serializers.SerializerMethodField()
    rrule      = serializers.SerializerMethodField()
    start      = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    end      = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = DisciplineSchedule
        fields = ('id', 'resourceId','title' ,'type_of', 'start', 'end', 'bgColor', 'resizable', 'movable', 'rrule')

    def get_resourceId(self, obj):
        return obj.group.id

    def get_title(self, obj):
        return str(obj.discipline.name)

    def get_bgColor(self, obj):
        if obj.type_of == "L":
            return "#005cfe"
        else:
            return "#fe0000"

    def get_rrule(self, obj):
        return f'FREQ=WEEKLY;DTSTART={obj.start.strftime("%Y%m%dT%H%M%SZ")};' \
               f'UNTIL={obj.rrule_end.strftime("%Y%m%dT%H%M%SZ")};BYDAY={WEEKDAYS[obj.start.weekday()]}'

'''END DISCIPLINE SERIALIZERS'''

'''GRADES SERIALIZERS'''

class GradesSerializer(serializers.ModelSerializer):
    discipline = DisciplineSerializer()
    created = serializers.DateTimeField(format="%Y-%m-%d")
    class Meta:
        model = Grade
        fields = ('id', 'discipline', 'grade', 'student', 'created')

class GradesSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('id', 'discipline', 'grade', 'student')

class StudentGradeSerializer(serializers.ModelSerializer):
    student = StudentProfileSerializerGET()
    class Meta:
        model = Grade
        fields = ('id', 'student', 'discipline', 'grade', 'student')

'''END GRADES SERIALIZERS'''

'''SURVEY SERIALIZERS'''
class AnswerSerializier(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'title')

class QuestionSerializier(serializers.ModelSerializer):
    answers = AnswerSerializier(source='answer', many=True)
    class Meta:
        model = Question
        fields = ('id', 'title', 'required', 'answers')

class SurveySerializer(serializers.ModelSerializer):
    questions = QuestionSerializier(source='question', many=True)
    major = MajorSerializer()

    class Meta:
        model = Survey
        fields = ('id', 'title', 'major', 'questions')

    def create(self, validated_data):
        questions = validated_data.pop('question')

        s_obj = Survey(**validated_data)
        s_obj.save()

        for q in questions:
            answers = q.pop('answer')
            q_obj = Question(survey=s_obj, **q)
            q_obj.save()
            for a in answers:
                a_obj = Answer(question=q_obj, **a)
                a_obj.save()

        return s_obj

class SurveyResolveSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResolveLog
        fields = ('id', 'user', 'survey', 'question', 'answer')

'''END SURVEY SERIALIZERS'''
