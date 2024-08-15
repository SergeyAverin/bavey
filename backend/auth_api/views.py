from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer
from .service import AuthService


class AuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })


class CreateUserView(APIView):
    service = AuthService()

    def post(self, request):
        user = self.service.create_user(
            username=request.data['username'],
            password=request.data['password'],
            first_name=request.data['first_name'],
            last_name=request.data['last_name'],
            email=request.data['email'],
        )
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': UserSerializer(user).data
        })
