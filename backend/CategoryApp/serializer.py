from rest_framework import serializers

from ExpApp.models import Position
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category_id', 'category_name')
    

