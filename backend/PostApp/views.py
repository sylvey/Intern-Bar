from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *

@api_view(['POST'])
def post_create(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        user_id = request.data['publisher']
        if check_login(user_id)['result'] == True:
            publisher = User.objects.get(user_id = user_id)
            post = Post(publisher = publisher)
            serializer = PostSerializer(post, data = request.data)
            if serializer.is_valid(): #validation of string length, datatype, etc.
                serializer.save()
                return Response(serializer.data ,status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
def post_getAll(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostGetSerializer(posts, many = True)
        # shell test
        # serializer = PostGetSerializer(posts[0], many = False) 
        return Response(serializer.data, status=status.HTTP_200_OK)
