from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Project(models.Model):
    title = models.CharField(max_length=50)
    objective = models.TextField()
    results = models.TextField()
    reach = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    datecompleted = models.DateTimeField(null=True, blank=True)
    state = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, editable=False)

    def __str__(self):
        return self.title + '- By: ' + self.user.username