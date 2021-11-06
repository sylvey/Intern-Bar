from django.urls import path
import PostApp.views as views


urlpatterns = [
    ### Add urls in view.py here
    path('post/create', views.post_create),
]
