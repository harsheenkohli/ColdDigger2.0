# authentication/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),  # Remove 'api/' prefix
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('check-auth/', views.check_auth, name='check_auth'),
]