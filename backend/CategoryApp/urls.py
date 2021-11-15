from django.urls import path
import CategoryApp.views as views


urlpatterns = [
    path('user/collection/create', views.category_create),
    path('collection/get', views.collection_get),
    path('collection/add', views.collection_add),
]
