from django.db import models

# Create your models here.
class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('UserApp.User', on_delete=models.CASCADE, related_name='CreatedByUser')
    category_name = models.CharField(max_length=25)

    def __unicode__(self):
        return u'%s %s' % (self.category_name, self.user)

class Collected_In(models.Model):    # Relationship
    # default primary key
    post = models.ForeignKey('PostApp.Post', on_delete=models.CASCADE, related_name='PostCollectedIn')
    category = models.ForeignKey('Category', on_delete=models.CASCADE, related_name='CollectedInCategory')