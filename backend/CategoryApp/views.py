from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializer import *
from UserApp.functs import *

from UserApp.models import User
from PostApp.models import Post

@api_view(['POST'])
def category_create(request):

	if 'application/json' not in request.content_type:
		return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

	if request.method == 'POST':
		user_id = request.data['user']
		category_name = request.data['category_name']
		if check_login(user_id):
			owner = User.objects.get(user_id=user_id)
			category = Category(user=owner, category_name=category_name)
			serializer = CategorySerializer(category, data=request.data)    # ???
			if serializer.is_valid():
				if(Category.objects.filter(user=owner, category_name=category_name).count() == 0):
					category_obj = serializer.save()
					return Response(CategorySerializer(category_obj).data, status=status.HTTP_201_CREATED)
				else:
					return Response("The name already exists.", status=status.HTTP_403_FORBIDDEN)
			else:
				return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def collection_add(request):

	if 'application/json' not in request.content_type:
		return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

	if request.method == 'POST':
		user_id = request.data['user_id']
		if check_login(user_id):
			post = Post.objects.get(post_id=request.data['post'])
			category = Category.objects.get(category_id=request.data['category'])
			collected_in = Collected_In(post=post, category=category)
			serializer = CollectedInSerializer(collected_in, data=request.data)
			if serializer.is_valid():
				if (Collected_In.objects.filter(post=post, category=category).count() == 0):
					serializer.save()
					return Response(status=status.HTTP_201_CREATED)
				else:
					return Response("The post has been collected in this category.", status=status.HTTP_400_BAD_REQUEST)
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def collection_get(request):

	if 'application/json' not in request.content_type:
		return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

	if request.method == 'POST':
		user_id = request.data['user_id']
		if check_login(user_id):
			category = Category.objects.get(category_id=request.data['category'])
			posts_to_display = Collected_In.objects.filter(category=category)
			serializer = CollectedInSerializer(posts_to_display, many=True)
			return Response(serializer.data, status=status.HTTP_200_OK)




