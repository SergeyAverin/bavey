import logging

from blog_api.models import User


logger = logging.getLogger()


class AuthService:
    def create_user(self, username, first_name, last_name, email, password):
        logger.error(password)
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        return user
