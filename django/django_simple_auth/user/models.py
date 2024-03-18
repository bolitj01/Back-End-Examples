from django.contrib.auth.models import User

# Proxy the User model to add permissions
class UserProxy(User):
    class Meta:
        proxy = True
        permissions = (
            ("view_any_email", "Can view any user's email"),
        )