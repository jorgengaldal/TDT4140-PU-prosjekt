from django.db import models
from members.models import CustomUser
from django.apps import apps

import uuid

class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    my_movie_list = models.ForeignKey("reviews.MovieList", on_delete=models.SET_NULL, null=True, blank=True, related_name='profile_owner')

    def __str__(self):
        return self.user.username
