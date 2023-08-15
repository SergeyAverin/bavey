from pydantic import BaseModel


class CreateCommunity(BaseModel):
    title: str
    owner: str
