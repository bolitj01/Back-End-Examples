from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def create_todo(request):
    return HttpResponse('todo created')

def delete_todo(request):
    return HttpResponse('todo deleted')

def update_todo(request):
    return HttpResponse('todo updated')