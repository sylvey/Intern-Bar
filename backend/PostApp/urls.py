from django.urls import path
import PostApp.views as views


urlpatterns = [
    ### Add urls in view.py here
    # path('user/create_post', views.create_post),
    path('post_getAll', views.post_getAll),
]
