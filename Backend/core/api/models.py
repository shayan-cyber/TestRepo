from django.db import models

# Create your models here.

GRADES = [

    ('A+', 'A+'),

    ('A', 'A'),
    ('A-', 'A-'),
    ( 'B+', 'B+'),
    ('B', 'B'),
    
    ('B-', 'B-'),
    ( 'C+', 'C+'),
    ('C', 'C'), 
    ('C-', 'C-'),
    ('D+', 'D+'),
    
    ( 'D', 'D'),
    
    ( 'D-', 'D-'), 
    ('F', 'F')
]


class StudentDetail(models.Model):
    name = models.CharField(max_length=100)
    course = models.CharField(max_length=200)
    performance = models.CharField(max_length=2, choices=GRADES)
    attendance = models.IntegerField(default=0)

    def __str__(self):
        return str(self.name) + str(self.id)
