from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *

# Create your views here.
@api_view(['GET'])
def post_getAll(request):
    if request.method == 'GET':
        posts = list(Post.objects.values())
        return Response(posts, status=status.HTTP_200_OK)
        # posts = Post.objects.values()
        # serializer = PostSerializer(posts, many = True)
        # return Response(serializer.data, status=status.HTTP_200_OK)

#@api_view(['POST'])
# def create_post(request):
#     if 'application/json' not in request.content_type:
#         return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

#     if request.method == 'POST':
#         postSerializer = PostSerializer(data = request.data)
#         if postSerializer.is_valid(): #validation of string length, datatype, etc.
#             if postSerializer.create():
#                 return Response(status=status.HTTP_200_OK)
