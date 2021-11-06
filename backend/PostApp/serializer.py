from rest_framework import serializers
from .models import *
from UserApp.serializer import UserSerializer

class PostSerializer(serializers.ModelSerializer):
    class Meta:
    model = Post
    fields = ('publisher', 'title', 'content', 'experience')
