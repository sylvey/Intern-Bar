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
            "author": UserSerializer(instance.author).data,
            "post_attached_id": PostSerializer(instance.post_attached_id).data,
            "content": instance.content,
            "published_time": instance.published_time,
            
        }

    
# class CommentSerializer(serializers.ModelSerializer):
#     user_id = UserSerializer(read_only = True)

#     class Meta:
#         model = Comment
#         fields = ('post_attached_id', 'author', 'content', 'published_time')

#     def create(self):
#         new_comment = Comment(
#             author = User.objects.get(user_id = self.validated_data['author']),
#             post_attached = Post.objects.get(user_id = self.validated_data['post_attached_id']),
#             content = self.validated_data['content'],
#             published_time = self.validated_data['published_time']
#         )
#         new_comment.save()
#         return new_comment

#     def display(self, instance):
#         return {
#             "post_attached_id": instance.post_attached,
#             "author": instance.author,
#             "content": instance.content,
#             "published_time": instance.published_time
#         }




