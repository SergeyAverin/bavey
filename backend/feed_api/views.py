from rest_framework.decorators import api_view
from rest_framework.response import Response

from blog_api.models import Publication, User
from blog_api.serializers import PublicationSerializer
from blog_api.services.publications import PublicationService


@api_view()
def feed(request):
    service = PublicationService()
    objects = Publication.objects.all().order_by('?')[:10]

    data = service.get_serialized_publicaitons_with_voices(objects)

    return Response(data, status=200)
