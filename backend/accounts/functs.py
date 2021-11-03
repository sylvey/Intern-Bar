from .models import User

#Checks whether the user exists and is logged-in.
#Returns {'result': boolean, 'status': string}
def check_login(user_id):
    user = User.objects.filter(user_id = user_id).first()
    if user == None: #user not existing
            return {'result': False, 'status': "User does not exist"}
    else:
        if user.status == True: #logged-in
            return {'result': True, 'status': ""}
        else: #not logged in
            return {'result': False, 'status': "User is not logged in"}