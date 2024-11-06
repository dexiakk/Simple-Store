from django.db import models
from django.contrib.auth.models import User

class UserDetails(models.Model):
    GENDER_CHOICES = {
        ('male', 'Męskie'),
        ('female', 'Damskie'),
        ('unisex', 'Uniseks')
    }
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userEmail")
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    preferedGender = models.CharField(max_length=50, choices=GENDER_CHOICES)
    dateOfBirth = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - Details"