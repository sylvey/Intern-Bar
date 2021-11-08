from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

<<<<<<< HEAD
from .serializer import ExpSerializer, OrgSerializer
=======
from .serializer import ExpSerializer, OrgSerializer, PlaceSerializer
>>>>>>> 97a929cb5e382583b10f06dbf5aa805709945d36
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
                request.data["pos"]["org"] = create_org(request.data["pos"]["org"])
                print(request.data["pos"]["org"])
            else: #User existing instance of org
                request.data["pos"]["org"] = request.data["pos"]["org"]["org_id"]

            # Deal with position   
            request.data["pos"].pop("pos_id")
            request.data["pos"] = create_pos(request.data["pos"])
                 
        else: #User existing instance of pos
            request.data["pos"] = request.data["pos"]["pos_id"]

        #Deal with experience
        expSerializer = ExpSerializer(data = request.data)
        if expSerializer.is_valid(raise_exception=True):
            new_exp = expSerializer.create()
            message = {"exp_id": new_exp.exp_id}
            return Response(data = message, status = status.HTTP_201_CREATED) 

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
        org_list = Organization.objects.filter(org_name__icontains = request.data['keyword'])
        orgSerializer = OrgSerializer(org_list, many = True)
        return Response(data = orgSerializer.data, status = status.HTTP_200_OK)

@api_view(['POST'])
def search_pos(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'POST':
        org = Organization.objects.get(org_id = request.data['org_id'])
        pos_list = Position.objects.filter(pos_name__icontains = request.data['keyword'], org = org)
        posSerializer = PosSerializer(pos_list, many = True)
        return Response(data = posSerializer.data, status = status.HTTP_200_OK)


<<<<<<< HEAD

=======
@api_view(['GET'])
def place(request):
    if request.method == 'GET':
        places = Place.objects.all()
        serializer = PlaceSerializer(places, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
>>>>>>> 97a929cb5e382583b10f06dbf5aa805709945d36

        
        