from datetime import datetime
from enum import Enum

from pydantic import BaseModel


class PublicationWallType(Enum):
    USER = "user"
    COMMUNITY = "community"


class PublicationEntity(BaseModel):
    title: str
    owner: str
    slug: str
    creation_date: datetime
    wall_type: PublicationWallType
    wall_user: str
    wall_community: str
