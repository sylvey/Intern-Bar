from django.db import models

# Create your models here.
        
class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    publisher = models.OneToOneField('UserApp.User', on_delete=models.SET_NULL, related_name='PublishedByUser', null=True)
    title = models.CharField(max_length=50)
    content = models.TextField()
    published_time = models.DateTimeField(auto_now=True)
    experience = models.OneToOneField('ExpApp.Experience', on_delete=models.CASCADE, related_name='AboutExp', null=True)

    def __unicode__(self):
        return self.title

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    author = models.OneToOneField('UserApp.User', on_delete=models.SET_NULL, related_name='CommentedByUser', null=True)
    post_attached = models.OneToOneField('Post', on_delete=models.CASCADE, related_name='UnderPost')
    content = models.TextField()
    published_time = models.DateTimeField(auto_now=True)