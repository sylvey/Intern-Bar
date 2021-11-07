from django.db import models
from django.db.models.fields import related

class Experience(models.Model):
    exp_id = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    pos = models.ForeignKey('Position', on_delete=models.CASCADE, related_name='ExpOfPos')
    user = models.ForeignKey('UserApp.User', on_delete=models.CASCADE, related_name='ExpOfUser')

    def __unicode__(self):
        return u'%s %s %s' % (self.user, self.pos_name, self.org)

class Position(models.Model):
    pos_id = models.AutoField(primary_key=True)
    pos_name = models.CharField(max_length=100)
    org = models.ForeignKey('Organization', on_delete=models.CASCADE, related_name='PosInOrg')
    place = models.ForeignKey('Place', on_delete=models.CASCADE, related_name='PosInPlace')
    salary = models.IntegerField(null=True, blank=True)
    class Meta:
        unique_together = (("pos_name", "org", "place", "salary"))

class Organization(models.Model):
    org_id = models.AutoField(primary_key=True)
    org_name = models.CharField(max_length=100)
    email = models.EmailField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)

    def __unicode__(self):
        return self.org_name

class Place(models.Model):
    place_id = models.CharField(max_length=3, primary_key=True)
    city = models.CharField(max_length=50)
    district = models.CharField(max_length=50)

# class Located_In(models.Model):    # Relationship
#     org = models.ForeignKey('Organization',on_delete=models.CASCADE, related_name='OrgLocatedIn')
#     location = models.ForeignKey('Place', on_delete=models.CASCADE, related_name='LocatedInSite')

#     class Meta:
#         unique_together = (("org", "location"))