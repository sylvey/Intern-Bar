from rest_framework import serializers
from .models import *
<<<<<<< HEAD
from ExpApp.models import Experience, Position


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('__all__')
        depth = 1

class ExperienceSerializer(serializers.ModelSerializer):
    pos = PositionSerializer(read_only = True)
    class Meta:
        model = Experience
        exclude = ('user',)
        depth = 1


class PostSerializer(serializers.ModelSerializer):
    # experience = ExperienceSerializer(read_only = True)

    class Meta:
        model = Post
        fields = ('publisher', 'title', 'content', 'experience')


class PostGetSerializer(serializers.ModelSerializer):
    experience = ExperienceSerializer(read_only = True)

    class Meta:
        model = Post
        fields = ('publisher_id', 'title', 'content', 'published_time', 'experience')
        
=======
from UserApp.serializer import UserSerializer
from ExpApp.serializer import ExpSerializer

class PostSerializer(serializers.ModelSerializer):
    experience = ExpSerializer(read_only = True)

    class Meta:
        model = Post
        fields = ('publisher', 'title', 'content', 'experience')

    def to_representation(self, instance):
        return {
            "post_id": instance.post_id,
            "publisher": UserSerializer(instance.publisher).data,
            "title": instance.title,
            "content": instance.content,
            "published_time": instance.published_time,
            "experience": ExpSerializer(instance.experience).data
        }
>>>>>>> backend
