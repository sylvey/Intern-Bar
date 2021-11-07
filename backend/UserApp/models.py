from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.CharField(max_length=25, primary_key=True)
    user_name = models.CharField(max_length=25)
    password = models.CharField(max_length=40)    # set minimum password length
    status = models.BooleanField()

    def __unicode__(self):
        return self.username




