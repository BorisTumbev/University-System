from datetime import datetime
import random

FACULTY_CHOICES = (
    ('FEA', 'FEA'),
    ('FMU', 'FMU'),
)

WEEKDAYS = {
    0: "MO",
    1: "TU",
    2: "WE",
    3: "TH",
    4: "FR",
    5: "SA",
    6: "SU",
}

def gen_student_num(fac):
    faculties = {
        'FEA' : 1,
        'FMU' : 2
    }
    stud_num = f'{datetime.today().year % 100}{faculties[fac]}{random.randrange(1, 10**5):05}'

    return int(stud_num)