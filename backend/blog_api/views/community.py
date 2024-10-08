import json
import logging
import ast

from django.db import IntegrityError
from django.http import HttpRequest
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from blog_api.models import Community, User
from blog_api.services.community import CommunityService
from blog_api.services.publications import PublicationService
from blog_api.serializers import CommunitySerializer, PublicationSerializer
from auth_api.serializers import UserSerializer
from core.permission import IsAuthenticatedOrReadOnly


logger = logging.getLogger()


class CommunityApiView(APIView):
    permission_classes = (
        IsAuthenticatedOrReadOnly,
    )
    service = CommunityService()

    def get(self, request: HttpRequest, title: str):
        user = self.service.get_community_by_title(title)
        return Response(CommunitySerializer(user).data)

    def patch(self, request: HttpRequest, title: str):
        try:
            new_data = self.service.update_community(title, request.data)
            return Response(new_data.data)
        except ValidationError as error:
            return Response({"error": error.detail}, status=400)


class CreateCommunityApiView(APIView):
    permission_classes = [
        IsAuthenticated,
    ]
    service = CommunityService()

    def get(self, request: HttpRequest):
        community = Community.objects.filter(subscribers=request.user)
        return Response(CommunitySerializer(community, many=True).data)

    def post(self, request: HttpRequest):
        try:
            community = self.service.create_community(
                request.user, request.data["title"]
            )
            return Response(CommunitySerializer(community).data)
        except IntegrityError as error:
            return Response({"error": str(error)}, status=400)


class CommunityPublicationApiView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PublicationSerializer
    service = CommunityService()

    def get_queryset(self):
        return self.service.get_community_publications(self.kwargs["title"])

    def get(self, request: HttpRequest, title: str):
        page = self.get_queryset()
        publication_service = PublicationService()
        data = publication_service.get_serialized_publicaitons_with_voices(
            page)
        return Response(data)

    def post(self, request: HttpRequest, title: str):
        wall_community = self.service.get_community_by_title(title)

        if not request.user.is_authenticated:
            return Response({'error': 'Authentication credentials were not provided.'}, status=401)

        publication = self.service.create_publication_on_community_wall(
            request.data.get(
                "title"), request.user, wall_community, request.FILES
        )
        return Response(
            PublicationSerializer(
                publication).data, status=status.HTTP_201_CREATED
        )


class CommunityStatisticApiView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    service = CommunityService()

    def get(self, request: HttpRequest, title: str):
        community = self.service.get_community_by_title(title)
        subscribers_count = community.subscribers.count()
        publication_count = self.service.get_community_publications(
            title).count()
        return Response(
            {"subscribers": subscribers_count, "publications": publication_count},
            status=status.HTTP_200_OK,
        )


class CommunitySubscribersApiView(APIView):
    service = CommunityService()

    def get(self, request: HttpRequest, title: str):
        user = request.user
        community = self.service.get_community_by_title(title)

        if not request.user.is_authenticated:
            return Response({
                'relationship_type': 'no_auth'
            }, status=status.HTTP_200_OK)
        relation_type = ''
        if user == community.owner:
            relation_type = 'owner'
        elif user in community.admins.all():
            relation_type = 'admin'
        elif user in community.subscribers.all():
            relation_type = 'subscriber'
        else:
            relation_type = 'subscribe'

        return Response({
            'relationship_type': relation_type
        }, status=status.HTTP_200_OK)

    def post(self, request: HttpRequest, title: str):
        community = self.service.get_community_by_title(title)
        self.service.subscribe(request.user, community)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def delete(self, request: HttpRequest, title: str):
        community = self.service.get_community_by_title(title)
        self.service.unsubscribe(request.user, community)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommunityAdmins(APIView):
    service = CommunityService()

    def get(self, request: HttpRequest, title: str):
        community = self.service.get_community_by_title(title)
        admins = community.admins.all()
        return Response(UserSerializer(admins, many=True).data)

    def post(self, request: HttpRequest, title: str):
        community = self.service.get_community_by_title(title)
        data = json.loads(request.body)
        data = ast.literal_eval(data['admins'])
        users = User.objects.filter(username__in=data)
        community.admins.set(users)
        return Response(UserSerializer(users, many=True).data)
