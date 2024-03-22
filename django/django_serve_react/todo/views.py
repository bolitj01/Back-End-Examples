from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo
from rest_framework.permissions import IsAuthenticated
import json

# class TodoViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     serializer_class = TodoSerializer
    
#     #Only get the todos of the user who is currently logged in
#     #Unless the user is a superuser, then they can see all todos
#     def get_queryset(self):
#         if self.request.user.is_superuser:
#             return Todo.objects.all()
#         else:
#             return Todo.objects.filter(user=self.request.user)
    
#     #Only create a todo for the user who is currently logged in
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# Add the todo in POST request to the todo list
def add_todo(request):
    data = json.loads(request.body)
    print(data)
    user = User.objects.get(username=data["username"])
    todo = Todo(title=data["title"], description=data["description"], user=user)
    todo.save()
    return HttpResponse(f"Todo {todo.title} added successfully")

# Get all the todos from the todo list
def get_todos(request):
    todos = Todo.objects.all()
    print(todos)
    data = serializers.serialize('json', todos)
    return JsonResponse(data, safe=False)

# Get all todos of a specific user
def get_user_todos(request):
    data = json.loads(request.body)
    user = User.objects.get(username=data["username"])
    todos = Todo.objects.filter(user=user)
    data = serializers.serialize('json', todos)
    return JsonResponse(data, safe=False)

# Remove the todo from the user's todo list
def remove_todo(request):
    data = json.loads(request.body)
    todo = Todo.objects.get(title = data["title"], user = data["user"])
    todo.delete()
    return HttpResponse(f"Todo {todo.title} removed successfully")


from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    #for API based on a field other than id
    #lookup_field = 'title' 