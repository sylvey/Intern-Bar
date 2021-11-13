from django.urls import path
import PostApp.views as views


urlpatterns = [
    ### Add urls in view.py here
    path('post/create', views.post_create),
    path('post/getAll', views.post_getAll),
    path('post/search', views.post_search),
    path('comment/create', views.comment_create),
    # path('comment/get', views.comment_getFromPost)
]
