from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=25)
    password = models.CharField(max_length=40)    # set minimum password length
    status = models.BooleanField()

    def __unicode__(self):
        return self.username

class Works_As(models.Model):    # Relationship
    # primary key?
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='UserWorksAs')
    position = models.ForeignKey('Position', on_delete=models.SET_NULL, related_name='WorksAsPos', null=True)
    start_time = models.DateField()
    end_time = models.DateField()

class Position(models.Model):
    pos_id = models.AutoField(primary_key=True)
    pos_name = models.CharField(max_length=100)
    org = models.ForeignKey('Organization', on_delete=models.CASCADE, related_name='PosInOrg')

    def __unicode__(self):
        return u'%s %s' % (self.pos_name, self.org_name)

class Organization(models.Model):
    org_id = models.AutoField(primary_key=True)
    org_name = models.CharField(max_length=100)
    email = models.EmailField(null=True)
    website = models.URLField(null=True)

    def __unicode__(self):
        return self.org_name

class Located_In(models.Model):    # Relationship
    # primary key?
    org = models.ForeignKey('Organization', on_delete=models.CASCADE, related_name='OrgLocatedIn')
    city = models.CharField(max_length=50)
    district = models.CharField(max_length=50)

class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    publisher = models.OneToOneField('User', on_delete=models.SET_NULL, related_name='PublishedByUser', null=True)
    title = models.CharField(max_length=50)
    content = models.TextField()
    published_time = models.DateTimeField(auto_now=True)
    position = models.OneToOneField('Position', on_delete=models.SET_NULL, related_name='AboutPos', null=True)

    def __unicode__(self):
        return self.title

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    author = models.OneToOneField('User', on_delete=models.SET_NULL, related_name='CommentedByUser', null=True)
    post_attached = models.OneToOneField('Post', on_delete=models.CASCADE, related_name='UnderPost')
    content = models.TextField()
    publishedTime = models.DateTimeField(auto_now=True)

class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='CreatedByUser')
    category_name = models.CharField(max_length=25)

    def __unicode__(self):
        return u'%s %s' % (self.category_name, self.user)

class Collected_In(models.Model):    # Relationship
    # primary key?
    post = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='PostCollectedIn')
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='CollectedInCategory')




