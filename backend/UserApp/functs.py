from .models import User
from rest_framework.exceptions import APIException
from rest_framework import status

class ErrorMessage(APIException): 
    default_code = {"status": False}

    def __init__(self, detail, status_code=None):
        self.detail = {**self.default_code, **detail}
        print(self.detail)
        if status_code is not None:
            self.status_code = status_code


#Checks whether the user exists and is logged-in.
#Returns {'result': boolean, 'status': string}
def check_login(user_id):
    user = User.objects.filter(user_id = user_id).first()
    if user == None: #user not existing
        raise ErrorMessage(detail = {"status": "User does not exist"}, 
                status_code = status.HTTP_400_BAD_REQUEST)
    else:
        if user.status == True: #logged-in
            return True
        else: #not logged in
            raise ErrorMessage(detail = {"status": "User is not logged in"}, 
                status_code = status.HTTP_401_UNAUTHORIZED)