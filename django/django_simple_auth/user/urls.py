from . import views
from django.urls import path

urlpatterns = [
    path('create_user/', views.create_user, name='create_user'),
    path('login/', views.login_user, name='login'),
    path('get_my_email/', views.get_my_email, name='get_email'),
    path('set_email_permission/', views.set_email_permission, name='set_email_permission'),
    path('get_any_email/<str:username>', views.get_any_email, name='get_any_email'),
    path('logout/', views.logout_user, name='logout'),
]