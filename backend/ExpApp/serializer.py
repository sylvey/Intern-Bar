from rest_framework import serializers
from .models import *
from UserApp.models import User

class OrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('org_name', 'email', 'website')

    def create(self):
        new_org = Organization(
            org_name = self.validated_data['org_name'],
            email = self.validated_data['email'],
            website = self.validated_data['website']
        )
        new_org.save()
        return new_org
    
    # def to_representation(self, instance):
    #     return {
    #         "org_name": instance.org_name,
    #         "place": Located_In.objects.,
    #         "email": instance.email,   
    #         "website": instance.website,
    #     }

class ExpSerializer(serializers.ModelSerializer):  
    org_id = serializers.IntegerField()
    user_id = serializers.CharField()

    class Meta:
        model = Experience
        fields = ('pos_name', 'start_date', 'end_date', 
        'org_id', 'user_id')
    
    def create(self):
        new_exp = Experience(
            pos_name = self.validated_data['pos_name'],
            start_date = self.validated_data['start_date'],
            end_date = self.validated_data['end_date'],
            org = Organization.objects.get(
                org_id = self.validated_data['org_id']),
            user = User.objects.get(
                user_id = self.validated_data['user_id'])
        )
        new_exp.save()
        return new_exp.exp_id

