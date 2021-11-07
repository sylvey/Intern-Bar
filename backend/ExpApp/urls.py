from django.urls import path
import ExpApp.views as views


urlpatterns = [
    ### Add urls in view.py here
    path('exp/create', views.exp_create),
    path('user/exp/get', views.get_user_exp),
    path('org/search', views.search_org)
]
