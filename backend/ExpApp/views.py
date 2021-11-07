from django.core.checks import messages
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render

from .serializer import ExpSerializer, OrgSerializer
from .models import *
from UserApp.models import User
from .functs import *

@api_view(['POST'])
def exp_create(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == "POST":
        # Deal with organization
        if request.data["pos"]["pos_id"] == -1: #Create new instance of pos if needed
            if request.data["pos"]["org"]["org_id"] == -1: # Create new instance of org if needed
                request.data["pos"]["org"].pop("org_id")
                orgSerializer = OrgSerializer(data = request.data["pos"]["org"])
                if orgSerializer.is_valid():
                    new_org = orgSerializer.create()
                    request.data["pos"]["org"] = new_org.org_id # Gets id of newly created org 
                else:
                    return Response(data = orgSerializer.errors, status = status.HTTP_400_BAD_REQUEST)     
            else: #User existing instance of org
                request.data["pos"]["org"] = request.data["pos"]["org"]["org_id"]
            print(request.data["pos"])

            # Deal with position   
            request.data["pos"].pop("pos_id")
            posSerializer = PosSerializer(data =request.data["pos"])
            if posSerializer.is_valid():
                new_pos = posSerializer.create()
                request.data["pos"] = new_pos.pos_id # Gets id of newly created pos
            else:
                return Response(data = posSerializer.errors, status = status.HTTP_400_BAD_REQUEST)   
        
        else: #User existing instance of pos
            request.data["pos"] = request.data["pos"]["pos_id"]

        #Deal with experience
        expSerializer = ExpSerializer(data = request.data)
        if expSerializer.is_valid():
            new_exp = expSerializer.create()
            message = {"exp_id": new_exp.exp_id}
            return Response(data = message, status = status.HTTP_201_CREATED)
        else:
            return Response(data = expSerializer.errors, status = status.HTTP_400_BAD_REQUEST)   

@api_view(['POST'])
def get_user_exp(request):
        if 'application/json' not in request.content_type:
            return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

        if request.method == "POST":
            user = User.objects.get(user_id = request.data['user_id'])
            exp_list = Experience.objects.filter(user = user)
            expSerializer = ExpSerializer(exp_list, many = True)

        return Response(data = expSerializer.data, status = status.HTTP_200_OK)


@api_view(['POST'])
def search_org(request):
        if 'application/json' not in request.content_type:
            return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

        if request.method == 'POST':
            org = Organization.objects.filter(org_name__icontains = request.data['keyword']).first()
            ##get_org_places(org)
        return Response(status = status.HTTP_200_OK)





        
        