from rest_framework import serializers
from .models import *
from UserApp.serializer import UserSerializer
from ExpApp.models import Experience

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('publisher', 'title', 'content', 'experience')

     
class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        exclude = ('user',)
        depth = 1

        
class PostGetSerializer(serializers.ModelSerializer):
    experience = ExperienceSerializer(read_only = True)

    class Meta:
        model = Post
        fields = ('publisher_id', 'title', 'content', 'experience')
        depth = 1
