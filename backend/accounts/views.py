from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *

@api_view(['POST'])
def signup(request):
    if 'application/json' not in request.content_type:
        return Response("Content type should be 'application/json'.", status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'POST':
        userId = request.data['userId']
        pwd = request.data['password']
        userName = request.data['userName']
    
    if(User.objects.filter(user_id = userId).count() == 0): # no existing user
        User.objects.create(user_id = userId, username = userName, password = pwd, status = False)
        return Response(status=status.HTTP_201_CREATED)
    else:
        message = {"status": "Existing user id"}
        return Response(data = message, status = status.HTTP_400_BAD_REQUEST)


