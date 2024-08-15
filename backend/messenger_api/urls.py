from django.urls import path

from . import views


urlpatterns = [
    path('chats_by_username/<str:reciever>', views.get_or_create_chat),
    path('chats/<str:room_name>', views.chat_room),
    path('chats', views.ChatAPI.as_view()),
]
