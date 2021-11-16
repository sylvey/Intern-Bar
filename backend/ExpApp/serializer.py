from rest_framework import serializers
from .models import *
from UserApp.models import User

class OrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('org_name', 'email', 'website')

    def create(self):
        try:
            new_org = Organization(
                org_name = self.validated_data['org_name'],
                email = self.validated_data['email'],
                website = self.validated_data['website']
            )
        except:
            new_org = Organization.objects.get(
                org_name = self.validated_data['org_name'],
                email = self.validated_data['email'],
                website = self.validated_data['website']
            )
        new_org.save()
        return new_org
    
    def to_representation(self, instance):
        return {
            "org_id": instance.org_id,
            "org_name": instance.org_name,
            "email": instance.email,   
            "website": instance.website,
        }

class PosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('pos_name', 'org', 'place', 'salary')

    def create(self):
        new_pos = Position(
            pos_name = self.validated_data['pos_name'],
            org = self.validated_data['org'],
            place = self.validated_data['place'],
            salary = self.validated_data['salary']
        )
        new_pos.save()
        return new_pos

    def to_representation(self, instance):
        return {
            "pos_id": instance.pos_id,
            "pos_name": instance.pos_name,
            "salary": instance.salary,
            "place": instance.place.district_id,
            "org": OrgSerializer(instance.org).data
        }

class ExpSerializer(serializers.ModelSerializer):  
    user_id = serializers.CharField()

    class Meta:
        model = Experience
        fields = ('start_date', 'end_date', 'pos', 'user_id')
    
    def create(self):
        new_exp = Experience(
            start_date = self.validated_data['start_date'],
            end_date = self.validated_data['end_date'],
            pos = self.validated_data['pos'],
            user = User.objects.get(user_id = self.validated_data['user_id'])
        )
        new_exp.save()
        return new_exp
    
    def to_representation(self, instance):
        return {
            "exp_id": instance.exp_id,
            "start_date": instance.start_date,
            "end_date": instance.end_date,
            "pos": PosSerializer(instance.pos).data
        }


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('__all__')
        depth = 1


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ('district_id', 'district_name')
