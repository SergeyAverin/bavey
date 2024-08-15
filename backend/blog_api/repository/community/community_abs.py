from abc import ABC, abstractmethod

from dto.community import CreateCommunity
from entity.community_entity import CommunityEntity


class CommunityRepository(ABC):
    @abstractmethod
    def get_by_title(self, title: str) -> CommunityEntity:
        pass

    @abstractmethod
    def get_publications_from_wall(self, title: str) -> CommunityEntity:
        pass

    @abstractmethod
    def update_by_title(self, slug: str) -> CommunityEntity:
        pass

    @abstractmethod
    def create_community(self, slug: str, community: CreateCommunity) -> CommunityEntity:
        pass
