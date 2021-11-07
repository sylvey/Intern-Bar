from django.core.checks import messages
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render

from .serializer import ExpSerializer, OrgSerializer
from .models import *
from UserApp.models import User

@api_view(['POST'])
def exp_create(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "POST":
        #Create new org if needed
        if request.data["org"]["org_id"] == -1:
            #Create new org instance
            request.data["org"].pop("org_id")
            place_id = request.data["org"].pop("place")
            place = Place.objects.get(place_id = place_id)
            orgSerializer = OrgSerializer(data = request.data["org"])
            if orgSerializer.is_valid():
                new_org = orgSerializer.create()
            else:
                return Response(data = orgSerializer.errors, status = status.HTTP_400_BAD_REQUEST)
            #Connect the new org to place
            new_locatedIn = Located_In(org = new_org, location = place)
            new_locatedIn.save()
            request.data["org_id"] = new_org.org_id
        else:
            request.data["org_id"] = request.data["org"]["org_id"]
        
        #create new experience     
        request.data.pop("org")
        expSerializer = ExpSerializer(data = request.data)
        if expSerializer.is_valid():
            newExp_id = expSerializer.create()
            messages = {"exp_id": newExp_id}
            return Response(status = status.HTTP_201_CREATED)
        else:
            return Response(data = expSerializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_exp(request):
        if 'application/json' not in request.content_type:
            return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

        if request.type == "GET":
            user = User.objects.filter(user_id = request['user_id'])
            exp_list = Experience.objects.filter(user = user)
            for exp in exp_list:
                org = exp.org
                orgSerializer = OrgSerializer(
                    org_name = org.org_name,
                    email = org.email,
                    website = org.website)
                orgSerializer.to_representation(org)