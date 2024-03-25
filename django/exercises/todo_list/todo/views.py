import re
from django.shortcuts import render
from django.http import HttpResponse
from .models import Todo
# django GET require decorator
from django.views.decorators.http import require_POST, require_GET
import json

# Create your views here.
@require_POST
def create_todo(request):
    todo = Todo()
    todo.title = request.POST['title']
    todo.description = request.POST['description']
    todo.save()
    return HttpResponse(f"todo {todo.title} created")

@require_GET
def get_todo(request, title):
    todo = Todo.objects.get(title=title)
    if todo is not None:
        return HttpResponse(f"todo {todo.title} retrieved")
    else:
        return HttpResponse('todo not found')


def delete_todo(request):
    data = json.loads(request.body)
    todo = Todo.objects.get(pk=data['pk'])
    if todo is not None:
        todo.delete()
        return HttpResponse(f"todo {todo.title} deleted")
    else:
        return HttpResponse('todo not found')
    
def update_todo(request):
    return HttpResponse('todo updated')