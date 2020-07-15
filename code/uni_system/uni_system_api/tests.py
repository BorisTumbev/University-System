from django.test import TestCase
from .models import UniUser


class LogInTest(TestCase):
    credentials = {
        'email': 'testuser@test.com',
        'password': 'secret'
    }

    def setUp(self):
        user_obj = UniUser(email=self.credentials['email'])
        user_obj.set_password(self.credentials['password'])
        user_obj.save()

    def test_login(self):
        # send login data
        response = self.client.post('/api/login', self.credentials, follow=True)
        # should be logged in now
        self.assertEqual(response.status_code, 200)


class StudentsTest(TestCase):

    def test_students(self):

        response_get_students = self.client.get('/api/students', follow=True)
        self.assertEqual(response_get_students.status_code, 200)
        self.assertEqual(response_get_students.json(), list())

        student_data_post = {
            "student_profile":{
                    "qualification_type":"MD",
                    "group":3,
                    "faculty":"FEA",
                    "semester":1
            },
            "password":"admin",
            "is_superuser":False,
            "username":"Lupe.Bruen",
            "first_name":"Eva",
            "last_name":"Hessel",
            "surname":"Keanu_Pfeffer",
            "email":"your.email+faker68612@gmail.com"
        }

        response_post_students = self.client.post('/api/students', student_data_post, follow=True)

        self.assertEqual(response_post_students.status_code, 200)
        self.assertEqual(response_post_students.json(), dict())


class EmailTest(TestCase):

    def test_email(self):
        response = self.client.post('/api/email/group/1', follow=True)
        self.assertEqual(response.status_code, 200)
