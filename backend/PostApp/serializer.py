from rest_framework import serializers

from ExpApp.models import Experience
from .models import *
from UserApp.models import User
from UserApp.serializer import UserSerializer
from ExpApp.serializer import ExpSerializer

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('publisher', 'title', 'content', 'experience')

    def create(self):
        new_post = Post(
            publisher = self.validated_data['publisher'],
            title = self.validated_data['title'],
            content = self.validated_data['content'],
            experience = self.validated_data['experience']
        )
        new_post.save()
        return new_post

    def to_representation(self, instance):
        return {
            "post_id": instance.post_id,
            "publisher": UserSerializer(instance.publisher).data,
            "title": instance.title,
            "content": instance.content,
            "published_time": instance.published_time.strftime("%Y-%m-%d %H:%M:%S"),
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
            "published_time": instance.published_time.strftime("%Y-%m-%d %H:%M:%S"),
            "content": instance.content,
        }




