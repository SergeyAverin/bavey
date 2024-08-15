from django.urls import path

from . import views

urlpatterns = [
    path('publications', views.feed),
    path('publications/time', views.TimeFeed.as_view()),
]
