from . import views
from django.urls import path

urlpatterns = [
    #e.g. /user/register
    path('register/', views.register, name='register'),
    #e.g. /user/delete
    path('delete/', views.delete, name='delete'),
]