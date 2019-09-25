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

class Grade(models.Model):
    discipline = models.ForeignKey(Discipline, on_delete=models.CASCADE, related_name='grades')
    grade      = models.PositiveSmallIntegerField()

    created    = models.DateTimeField(auto_now_add=True)
    updated    = models.DateTimeField(auto_now=True)

class Group(models.Model):
    name       = models.CharField(max_length=50)
    discipline = models.ForeignKey(Discipline, on_delete=models.CASCADE, related_name='groups')
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
    grades              = models.ForeignKey(Grade, on_delete=models.CASCADE, related_name='student_grade', blank=True, null=True)
    qualification_type  = models.CharField(choices=QT_CHOICES, max_length=50)
    group               = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='students')
    faculty             = models.CharField(choices=FACULTY_CHOICES, max_length=50)
    semester            = models.PositiveIntegerField()

    created             = models.DateTimeField(auto_now_add=True)
    updated             = models.DateTimeField(auto_now=True)

    def save(self,  *args, **kwargs):
        self.student_num = gen_student_num(self.faculty)
        self.roles.add(Role.objects.get_or_create(id=Role.STUDENT))
        super().save(*args, **kwargs)

