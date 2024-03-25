from . import views
from django.urls import path

urlpatterns = [
    # e.g. /todo/create
    path('create/', views.create_todo, name='create_todo'),
    # e.g. /todo/delete
    path('delete/', views.delete_todo, name='delete_todo'),
    # e.g. /todo/update
    path('update/', views.update_todo, name='update_todo'),
    # e.g. /todo/get
    path('get/<str:title>/', views.get_todo, name='get_todo'),
]