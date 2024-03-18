from rest_framework import serializers
from .models import ToDo

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'  # Or list the fields you want to include (e.g., ['id', 'name', 'description']).
