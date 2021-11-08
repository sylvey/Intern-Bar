from rest_framework import serializers
from .models import *
from UserApp.serializer import UserSerializer
from ExpApp.models import Experience
from UserApp.models import User

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

class CommentSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField()

    class Meta:
        model = Post
        fields = {'comment_id', 'author', 'post_attached', 'content', 'published_time'}

    def create(self):
        new_comment = Comment(
            author = User.objects.get(user_id = self.validated_data['author']),
            post_attached = Post.objects.get(user_id = self.validated_data['post_attached']),
            content = self.validated_data['content'],
            published_time = self.validated_data['published_time']
        )
        new_comment.save()
        return new_comment

    def display(self, instance):
        return {
            "comment_id": instance.comment_id,
            "author": instance.author,
            "published_time": instance.published_time,
            "content": instance.content
        }




