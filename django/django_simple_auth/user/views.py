from django.shortcuts import render
from django.http import HttpResponse, HttpResponseForbidden
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Permission
from django.views.decorators.http import require_http_methods

# Create a user only allowing POST requests
@require_http_methods(["POST"])
def create_user(request):
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password']
    #...
    user = User.objects.create_user(
        username=username, email=email, password=password
    )
    user.set_
    return HttpResponse(f'User {user.username} created!')

#User login only allowing POST requests
@require_http_methods(["POST"])
def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        print(username, password)
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(f'{username} logged in')
        else:
            return HttpResponse('Invalid credentials')
    return render(request, 'login.html')

def get_my_email(request):
    if request.user.is_authenticated:
        return HttpResponse(f'Email: {request.user.email}')
    else:
        return HttpResponse('Not logged in')

#Set email permission for any user only if the currently logged in user is a superuser (admin)
def set_email_permission(request):
    if request.user.is_authenticated and request.user.is_superuser:
        username = request.POST['username']
        user = User.objects.get(username=username)
        # view_permission = Permission.objects.get(codename='view_any_email') #Get the custom permission
        view_permission = Permission.objects.get(codename='view_user') #Get the built-in permission
        if request.POST['allowed'] == "true":
            # user.user_permissions.add(view_permission) #Add the custom permission
            user.user_permissions.add(view_permission) #Add the built-in permission
        else:
            # user.user_permissions.remove(view_permission) #Remove the custom permission
            user.user_permissions.remove(view_permission) #Remove the built-in permission
        return HttpResponse(f'Permission view_user = {request.POST['allowed']} granted to {user.username}')
    else:
        return HttpResponseForbidden('Now allowed: you are either not logged in or not a superuser')

#Get any user's email only if the permission is granted
def get_any_email(request, username):
    if request.user.is_authenticated:
        # if (request.user.has_perm('user.view_any_email') or request.user.username == username): #Using a custom permission
        if (request.user.has_perm('auth.view_user') or request.user.username == username): #Using a built-in permission
            user = User.objects.get(username=username)
            return HttpResponse(f'Email: {user.email}')
        else:
            return HttpResponseForbidden('Your user does not have permission to view this email')
    else:
        return HttpResponse('Not logged in')

#logout
def logout_user(request):
    logout(request)
    return HttpResponse('Logged out')
