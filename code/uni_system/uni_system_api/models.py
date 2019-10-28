from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from .utils import FACULTY_CHOICES, gen_student_num

class Role(models.Model):
  STUDENT = 1
  TEACHER = 2
  STAFF = 3
  ADMIN = 4

  ROLE_CHOICES = (
      (STUDENT, 'student'),
      (TEACHER, 'teacher'),
      (STAFF, 'staff'),
      (ADMIN, 'admin'),
  )

  id = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, primary_key=True)

class Discipline(models.Model):
    name     = models.CharField(max_length=100)
    faculty  = models.CharField(choices=FACULTY_CHOICES, max_length=100)
    semester = models.PositiveIntegerField()

    def __str__(self):
        return self.name

class DisciplineSchedule(models.Model):
    T_CHOICES = (
        ('L', 'Lecture'),
        ('P', 'Practice'),
    )

    group      = models.ForeignKey('Group', on_delete=models.CASCADE, related_name='group_schedule')
    type_of    = models.CharField(choices=T_CHOICES, max_length=2, null=True)
    start      = models.DateTimeField(null=True)
    end        = models.DateTimeField(null=True)
    rrule_end  = models.DateTimeField(null=True)
    discipline = models.ForeignKey(Discipline, on_delete=models.CASCADE, related_name='disc_schedule')

class Grade(models.Model):
    discipline = models.ForeignKey(Discipline, on_delete=models.CASCADE, related_name='disc_grades')
    grade      = models.IntegerField(validators=[MaxValueValidator(6),MinValueValidator(2)])
    student    = models.ForeignKey('StudentProfile', on_delete=models.CASCADE, related_name='st_grades', null=True)

    created    = models.DateTimeField(auto_now_add=True)
    updated    = models.DateTimeField(auto_now=True)

class Group(models.Model):
    name       = models.CharField(max_length=50)
    major      = models.ForeignKey('Major', on_delete=models.CASCADE, related_name='group')

    def __str__(self):
        return str(self.id)

class Major(models.Model):
    name       = models.CharField(max_length=50)
    faculty    = models.CharField(choices=FACULTY_CHOICES, max_length=100)

class UniUser(AbstractUser):
    roles   = models.ManyToManyField(Role)
    surname = models.CharField(max_length=30)
    email   = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class TeacherProfile(models.Model):
    user    = models.OneToOneField(UniUser, on_delete=models.CASCADE, related_name='teacher_profile')
    faculty = models.CharField(choices=FACULTY_CHOICES, max_length=50)
    groups  = models.ManyToManyField(Group)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class StudentProfile(models.Model):
    QT_CHOICES = (
        ('BD', 'Bachelor degree'),
        ('MD', 'Master degree'),
        ('PHD', 'Doctorate'),
    )

    user                = models.OneToOneField(UniUser, on_delete=models.CASCADE, related_name='student_profile', blank=True, null=True)
    student_num         = models.PositiveIntegerField()
    qualification_type  = models.CharField(choices=QT_CHOICES, max_length=50)
    group               = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='students')
    faculty             = models.CharField(choices=FACULTY_CHOICES, max_length=50)
    semester            = models.PositiveIntegerField(default=1, validators=[MaxValueValidator(8),MinValueValidator(1)])

    created             = models.DateTimeField(auto_now_add=True)
    updated             = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'
