from pydantic import BaseModel

from models import WallTypeChoices, User, Community


class CreatePublicationDTO(BaseModel):
    title: str
    wall_type: WallTypeChoices
    wall_user: User
    wall_community: Community
