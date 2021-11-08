from rest_framework import serializers
from .models import *
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
        