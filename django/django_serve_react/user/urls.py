from django.urls import path

from . import views

# URL Configuration
urlpatterns = [
    # e.g. http://localhost:8000/user/create_user
    path("create_user/", views.create_user, name="create_user"),
    # e.g. http://localhost:8000/user/delete_user
    path("delete_user/", views.delete_user, name="delete_user"),
]

