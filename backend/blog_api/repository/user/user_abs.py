from abc import ABC, abstractmethod

from entity.user_entity import UserEntity
from dto.user import CreateUserDTO, UpdateDTO


class UserRepository(ABC):
    @abstractmethod
    def get_by_username(self, slug: str) -> UserEntity:
        pass

    @abstractmethod
    def get_user_statistic_by_username(self, slug: str) -> None:
        pass

    @abstractmethod
    def update_by_slug(self, slug: str, title: str) -> UserEntity:
        pass

    @abstractmethod
    def create(self, publication: CreateUserDTO) -> None:
        pass

    @abstractmethod
    def update_by_username(self, username: str, user: UpdateDTO):
        pass

    @abstractmethod
    def get_publications_from_wall(self, username: str):
        pass
