from .models import *
from .serializer import *

# def get_org_places(org):
#     pos_list = Position.objects.filter(org = org)
#     temp_place_list = pos_list.values_list("place", flat=True) #with duplicate values
#     place_list = list(set(temp_place_list))