from django.urls import path

from . import views


urlpatterns = [
    path('login', views.AuthToken.as_view()),
    path('registration', views.CreateUserView.as_view()),
]
