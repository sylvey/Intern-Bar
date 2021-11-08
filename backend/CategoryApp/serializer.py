from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ('user', 'category_name')

	def create(self):
		new_cat = Comment(
            user = User.objects.get(user_id = self.validated_data['user']),
            category_name = self.validated_data['category_name']
        )
        new_cat.save()
        return new_cat




