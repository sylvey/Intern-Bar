from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'password', 'user_name')

    def create(self):
        if(User.objects.filter(user_id = self.validated_data['user_id']).count() == 0):
            print(self.validated_data['user_id'])
            new_user = User(user_id = self.validated_data['user_id'], 
                user_name = self.validated_data['user_name'], 
                password = self.validated_data['password'],
                status = False)
            new_user.save()
            return True
        else:
            return False
