from .models import User

def check_login(user_id):
    user = User.objects.get(user_id = user_id)
    if user.status == True:
        return True
    else:
        return False