from .models import *
from .serializer import *

def create_org(org_data):
    #Check if there is existing company
    existing_orgs = Organization.objects.filter(
        org_name = org_data["org_name"],
        email = org_data["email"],
        website = org_data["website"]
    )
    if len(existing_orgs) != 0:
        return existing_orgs.first().org_id

    #Create new org
    org_data.pop("org_id")
    orgSerializer = OrgSerializer(data = org_data)
    if orgSerializer.is_valid(raise_exception=True):
        new_org = orgSerializer.create()
        return new_org.org_id # Gets id of newly created org

def create_pos(pos_data):
    #Check if there is existing position
    existing_positions = Position.objects.filter(
        pos_name = pos_data["pos_name"],
        org = Organization.objects.get(org_id = pos_data["org"]),
        place = District.objects.get(district_id = pos_data["place"]),
        salary = pos_data["salary"]
    )
    print(existing_positions)
    if len(existing_positions) != 0:
        return existing_positions.first().pos_id

    posSerializer = PosSerializer(data = pos_data)
    if posSerializer.is_valid(raise_exception=True):
        print(posSerializer.validated_data)
        new_pos = posSerializer.create()
        return new_pos.pos_id # Gets id of newly created pos