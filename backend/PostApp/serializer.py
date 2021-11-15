from rest_framework import serializers
from .models import *
from UserApp.models import User
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

# -- Comment --
class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('post_attached_id', 'author', 'content', 'published_time')
    
    def to_representation(self, instance):
        return {
            "comment_id": instance.comment_id,
            "author": UserSerializer(instance.author).data['user_name'],
            # "post_attached_id": PostSerializer(instance.post_attached_id).data,
            "published_time": instance.published_time,
            "content": instance.content,
        }




