from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializer import *

@api_view(['POST'])
def category_create(request):
	if 'application/json' not in request.content_type:
		return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

	if request.method == 'POST':
		user_id = request.data['user']
		if check_login(user_id)['result'] == True:
			serializer = CatSerializer(data=request.data)
			if serializer.is_valid():
				if serializer.create():
					return Response(status=status.HTTP_201_CREATED)
				else:
					return Response("The name already exists.", status=status.HTTP_403_FORBIDDEN)
			else:
				return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_from_category(request):
	if 'application/json' not in request.content_type:
		return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

	if request.method == 'GET':
		user_id = request.data['user']
		category = request.data['category_id']
        if check_login(user_id)['result'] == True:
            post_to_display = Post.objects.filter()    # joint: collected in





