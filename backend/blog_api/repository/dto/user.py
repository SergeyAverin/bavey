from pydantic import BaseModel


class CreateUserDTO(BaseModel):
    email: str
    password: str
    username: str
    first_name: str
    last_name: str


class UpdateDTO(BaseModel):
    email: str
    password: str
    username: str
    first_name: str
    last_name: str
