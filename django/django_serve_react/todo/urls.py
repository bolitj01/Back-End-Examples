from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"todos", views.TodoViewSet, basename="todo")

# URL Configuration
urlpatterns = [
    # Django REST Framework URLs
    path("", include(router.urls)),
    # e.g. http://localhost:8000/todos/
    path("", views.get_todos, name="get_todos"),
    # e.g. http://localhost:8000/todos/add_todo
    path("add_todo", views.add_todo, name="add_todo"),
    # e.g. http://localhost:8000/todos/remove_todo
    path("remove_todo", views.remove_todo, name="remove_todo"),
    # e.g. http://localhost:8000/todos/get_user_todos
    path("get_user_todos", views.get_user_todos, name="get_user_todos"),
]

