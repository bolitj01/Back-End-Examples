from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

# Create your views here.
def register(request):
    user = User.objects.create_user(username=request.POST['username'], 
                                    password=request.POST['password'])
    user.save()
    return HttpResponse(f"user {user.username} created")

def user_login(request):
    user = authenticate(request, username=request.POST['username'], 
                                    password=request.POST['password'])
    if user is not None:
        login(request, user)
        return HttpResponse(f"user {user.username} logged in")
    
def delete(request):
    return HttpResponse('user deleted')