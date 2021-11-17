from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializer import ExpSerializer, OrgSerializer, CitySerializer, DistrictSerializer
from .models import *
from UserApp.functs import check_login
from .functs import *

#login required
@api_view(['POST'])
def exp_create(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == "POST":
        #Check login status
        user_id = request.data["user_id"]
        if check_login(user_id):       
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


@api_view(['GET'])
def city(request):
    if request.method == 'GET':
        cities = City.objects.all()
        serializer = CitySerializer(cities, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

@api_view(['POST'])
def district(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'POST':
        city_id = request.data['city_id']
        districts = District.objects.filter(city_id = city_id)
        serializer = DistrictSerializer(districts, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)



