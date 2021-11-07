from django.urls import path
import ExpApp.views as views


urlpatterns = [
    ### Add urls in view.py here
    path('exp/create', views.exp_create)
]
