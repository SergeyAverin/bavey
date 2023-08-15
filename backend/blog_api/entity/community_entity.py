from datetime import datetime

from pydantic import BaseModel


class CommunityEntity(BaseModel):
    title: str
    description: str
    creation_date: datetime
    owner: str
    admins: str
    subscribers: str
    community_avatar: str
