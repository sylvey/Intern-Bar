from django.urls import path
import ExpApp.views as views


urlpatterns = [
    ### Add urls in view.py here
    path('exp/create', views.exp_create),
    path('org/search', views.search_org),
    path('pos/search', views.search_pos),
    path('city', views.city),
    path('district', views.district)
]
