from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .functs import *
from CategoryApp.models import Category
from ExpApp.models import Experience
from PostApp.models import Post

from .serializer import UserSerializer
from ExpApp.serializer import ExpSerializer
from PostApp.serializer import PostSerializer
from CategoryApp.serializer import CategorySerializer

@api_view(['POST'])
def signup(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        userSerializer = UserSerializer(data = request.data)
        if userSerializer.is_valid(): #validation of string length, datatype, etc.
            if userSerializer.create():
                return Response(status=status.HTTP_201_CREATED)
            else:
                message = {"status": "Existing user id"}
            return Response(data = message, status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data = userSerializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
@api_view(['POST'])
def login(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        user_id = request.data['user_id']
        password = request.data['password']
        user = User.objects.filter(user_id = user_id).first()
        if user == None: #user not existing
            message = {"status": "User does not exist"}
            return Response(data = message, status = status.HTTP_400_BAD_REQUEST)
        else:
            if user.password != password: #incorrect password
                message = {"status": "Incorrect password"}
                return Response(data = message, status= status.HTTP_401_UNAUTHORIZED)
            else: #validated
                user.status = True
                user.save(update_fields=['status'])
                return Response(data = {}, status=status.HTTP_200_OK)

# login required
@api_view(['POST'])
def logout(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        user_id = request.data['user_id']
        if check_login(user_id):
            user = User.objects.get(user_id = user_id)
            user.status = False
            user.save(update_fields=['status'])
            return Response(data = {}, status=status.HTTP_200_OK)

#login_required
@api_view(['POST'])
def get_user_cat(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'POST':
        user_id = request.data['user_id']
        if check_login(user_id):
            #Get all categories of the user
            cat_list = Category.objects.filter(user = user_id)
            cat_response_list = CategorySerializer(cat_list, many = True).data
            return Response(data = cat_response_list, status=status.HTTP_200_OK)
            
@api_view(['POST'])
def get_user_exp(request):
        if 'application/json' not in request.content_type:
            return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

        if request.method == "POST":
            user_id = request.data['user_id']
            user = User.objects.get(user_id = user_id)
            exp_list = Experience.objects.filter(user = user)
            expSerializer = ExpSerializer(exp_list, many = True)

        return Response(data = expSerializer.data, status = status.HTTP_200_OK)

@api_view(['POST'])
def get_user_post(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'POST':
        user_id = request.data['user_id']
        user = User.objects.get(user_id = user_id)
        if user != None:
            posts = Post.objects.filter(publisher = user)
            postSerializer = PostSerializer(posts, many = True)
            return Response(postSerializer.data, status = status.HTTP_200_OK)
        else:
            message = {"status": "User does not exist"}
            return Response(data = message, status = status.HTTP_400_BAD_REQUEST)
