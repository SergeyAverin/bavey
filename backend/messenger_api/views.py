from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
import logging

from blog_api.services.user_blog import UserBlogService
from .serializers import ChatMessageSerializer, ChatSerializer
from .service import ChatService
from blog_api.models import User
from .models import Chat


logger = logging.getLogger()

@api_view()
def chat_room(request, room_name):
    service = ChatService()
    messages = service.get_chat_messages(room_name)
    return Response(ChatMessageSerializer(messages, many=True).data, status=200)


class ChatAPI(APIView):
    service = ChatService()

    def get(self, request):
        service = ChatService()
        chats = service.get_users_chats(request.user)
        return Response(ChatSerializer(chats, many=True).data, status=200)

    def post(self, request):
        # если существует чат мужду двумя пользователями вернуть его
        # иначе создать новый чат и вернуть его
        chat = Chat()
        chat.save()
        chat.users_in_chat.add(request.user)
        user_service = UserBlogService()
        user = user_service.get_user_by_username(request.body['username'])
        chat.users_in_chat.add(user)
        return Response(ChatSerializer(chat).data, status=200)


@api_view()
def get_or_create_chat(request, reciever):
    sender_chats = request.user.users_in_chat.all()
    reciever_user = User.objects.get(username=reciever)
    reciever_user_chats = reciever_user.users_in_chat.all()

    for chat in reciever_user_chats:
        for sender_chat in sender_chats:
            if chat.pk == sender_chat.pk:
                return Response(ChatSerializer(chat).data, status=200)
    chat = Chat()
    chat.save()
    chat.users_in_chat.add(request.user)
    chat.users_in_chat.add(reciever_user)
    return Response(ChatSerializer(chat).data, status=200)
