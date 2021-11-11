from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


from .models import *
from .serializer import *
from UserApp.functs import *
from UserApp.models import User
from ExpApp.models import Experience
import datetime
from datetime import date
<<<<<<< HEAD
=======
from PostApp.serializer import PostSerializer
>>>>>>> backend

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
<<<<<<< HEAD
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
=======
                post_obj = serializer.save()            
                return Response(PostSerializer(post_obj).data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data = check_login['status'], status = status.HTTP_401_UNAUTHORIZED)
>>>>>>> backend


@api_view(['GET'])
def post_getAll(request):
    if request.method == 'GET':
        posts = Post.objects.all().order_by('-published_time')
<<<<<<< HEAD
        serializer = PostGetSerializer(posts, many = True)
        return Response(serializer.data ,status=status.HTTP_200_OK)


=======
        serializer = PostSerializer(posts, many = True)
        return Response(serializer.data ,status=status.HTTP_200_OK)

>>>>>>> backend
@api_view(['POST'])
def post_search(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'POST':
        #"searchType" can be org, pos, startDate, EndDate
        org = request.data['keyword_org']
        pos = request.data['keyword_pos']
        sDate = request.data['keyword_sDate']
        eDate = request.data['keyword_eDate']

        if len(org) == 0 and len(pos) == 0 and len(sDate) == 0 and len(eDate) == 0:
            return Response("Fill in at least one field", status=status.HTTP_400_BAD_REQUEST)
        
        if len(sDate) != 0 and len(eDate) != 0:
            if sDate > eDate:
                return Response("Check your start date and end date.", status=status.HTTP_400_BAD_REQUEST)
        
        post_list = []

        if len(org) != 0:
            post_list = Post.objects.filter(experience__pos__org__org_name__icontains = org)
        
        if len(pos) != 0:
            temp_pos = Post.objects.filter(experience__pos__pos_name__icontains = pos)
            if len(post_list) == 0:
                post_list = temp_pos
            else:
                post_list = post_list.intersection(temp_pos)

        
        if len(sDate) != 0: 
            if len(eDate) == 0:
                eDate = date.today()
            
            temp_sDate = Post.objects.filter(experience__start_date__range=(sDate, eDate))
            temp_eDate = Post.objects.filter(experience__end_date__range=(sDate, eDate))
            #inputs overlap totally
            ts = Post.objects.filter(experience__start_date__lte = sDate)
            te = Post.objects.filter(experience__end_date__gte = eDate)
            t = ts.intersection(te) # intersection
            
            ttt = temp_sDate.union(temp_eDate)
            
            final = t.union(ttt)
            if len(post_list) == 0:
                post_list = final
            else:
                post_list = post_list.intersection(final)

<<<<<<< HEAD
        serializer = PostGetSerializer(post_list.order_by('-published_time'), many = True)
        return Response(serializer.data ,status=status.HTTP_200_OK)


from UserApp.models import User
from PostApp.models import Post
from ExpApp.models import Experience
from PostApp.serializer import PostSerializer
from PostApp.serializer import ExperienceSerializer
from PostApp.serializer import PostGetSerializer
=======
        serializer = PostSerializer(post_list.order_by('-published_time'), many = True)
        return Response(serializer.data ,status=status.HTTP_200_OK)

>>>>>>> backend
