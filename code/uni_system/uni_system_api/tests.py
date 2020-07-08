from django.test import TestCase

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
