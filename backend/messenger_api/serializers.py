from rest_framework import serializers

from .models import ChatMessage, Chat
from blog_api.models import User
from blog_api.serializers import UserSerializer


class ChatMessageSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = ChatMessage
        fields = [
            'message',
            'user'
        ]


class UserFromChat(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username'
        ]


class ChatSerializer(serializers.ModelSerializer):
    users_in_chat = UserFromChat(many=True)

    class Meta:
        model = Chat
        fields = [
            'slug',
            'users_in_chat'
        ]
