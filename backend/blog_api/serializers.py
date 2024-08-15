from rest_framework import serializers

from .models import Publication, PublicationMedia, Community


class PublicationMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicationMedia
        fields = [
            'type',
            'image',
            'file'
        ]


class PublicationSerializer(serializers.ModelSerializer):
    publication_media = PublicationMediaSerializer(many=True, read_only=True)

    class Meta:
        model = Publication
        fields = [
            'title',
            'slug',
            'wall_type',
            'wall_user',
            'wall_community',
            'creation_date',
            'publication_media',
        ]


class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = [
            'title',
            'description',
            'creation_date',
            'community_avatar',
        ]
