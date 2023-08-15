from abc import ABC, abstractmethod

from dto.publication import CreatePublicationDTO
from entity.publication_entity import PublicationEntity


class PublicationRepository(ABC):
    @abstractmethod
    def get_by_slug(self, slug: str) -> PublicationEntity:
        pass

    @abstractmethod
    def remove_by_slug(self, slug: str) -> None:
        pass

    @abstractmethod
    def update_by_slug(self, slug: str, title: str) -> PublicationEntity:
        pass

    @abstractmethod
    def create(self, publication: CreatePublicationDTO) -> None:
        pass

    @abstractmethod
    def get_publication_by_user_wall(self, username: str):
        pass

    @abstractmethod
    def get_publication_by_community_wall(self, username: str):
        pass
