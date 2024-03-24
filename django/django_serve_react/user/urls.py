from django.urls import path
from .views import CreateUser, DeleteUser, LoginUser, GetCSRFToken

urlpatterns = [
    #Token retrieval is for testing only
    path('get_csrf_token/', GetCSRFToken.as_view(), name='get_csrf_token'),
    path('create_user/', CreateUser.as_view(), name='create_user'),
    path('delete_user/', DeleteUser.as_view(), name='delete_user'),
    path('login/', LoginUser.as_view(), name='login'),
]
