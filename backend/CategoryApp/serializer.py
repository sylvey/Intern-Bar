from rest_framework import serializers
from .models import *
from UserApp.models import User
from UserApp.serializer import UserSerializer
from PostApp.serializer import PostSerializer
from ExpApp.models import Position

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ('category_id', 'user', 'category_name')

    def to_representation(self, instance):
        return {
            "category_id": instance.category_id,
            "user": UserSerializer(instance.user).data,
            "category_name": instance.category_name
        }

class CollectedInSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collected_In
        fields = ('post', 'category')

    def to_representation(self, instance):
        return {
            "post": PostSerializer(instance.post).data
        }




