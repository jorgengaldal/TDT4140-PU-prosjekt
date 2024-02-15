from django.db import models
from movies.models import Movie
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

import uuid


class MovieReview(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE, related_name='reviews')
    movie_list = models.ForeignKey(
        'MovieList', on_delete=models.CASCADE, related_name='reviews')
    review_text = models.TextField()
    rating = models.IntegerField(default=None, validators=[
        MaxValueValidator(10),
        MinValueValidator(1)
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.movie.title} - {self.rating}/10"


class MovieList(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, default="My Movie List")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owners = models.ManyToManyField(User, related_name='movie_lists')

    def __str__(self):
        return self.name
