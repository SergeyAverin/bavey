from django.contrib import admin
from django.contrib.sessions.models import Session

from . import models


admin.site.register(models.User)
admin.site.register(models.Publication)
admin.site.register(models.Voice)
admin.site.register(models.PublicationMedia)
admin.site.register(models.Community)

admin.site.register(models.Relationships)
admin.site.register(models.FriendRequest)

admin.site.register(Session)
