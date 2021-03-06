"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
import UserApp.views as views

# from accounts.views import hello_world

urlpatterns = [
    ### Add urls in view.py here
    path('user/create', views.signup),
    path('user/login', views.login),
    path('user/logout', views.logout),
    path('user/myCat', views.get_user_cat),
    path('user/exp/get', views.get_user_exp),
    path('user/post/get', views.get_user_post),
]
