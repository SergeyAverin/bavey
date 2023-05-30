from django.urls import path

from . import views

urlpatterns = [
    path('publications', views.feed),
]
