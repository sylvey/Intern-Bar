from rest_framework import serializers
from .models import *
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
