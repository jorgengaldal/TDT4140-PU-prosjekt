from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
import uuid

MAX_NAME_LENGTH = 50


class Movie(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(
        default=datetime.now, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    rated = models.CharField(
        default=None, max_length=64, null=True, blank=True)
    released = models.DateField(default=None, null=True, blank=True)
    runtime = models.IntegerField(default=None, null=True, blank=True)

    genres = models.ManyToManyField("Genre", related_name="movies",default=None)
    awards = models.ManyToManyField("Award", related_name="movies", default=None)
    countries = models.ManyToManyField("Country", related_name="movies", default=None)
    languages = models.ManyToManyField("Language", related_name="movies", default=None)

    actors = models.ManyToManyField("Person", related_name="acted_movies", default=None)
    directors = models.ManyToManyField("Person", related_name="directed_movies", default=None)
    writers = models.ManyToManyField("Person", related_name="written_movies", default=None)

    plot = models.TextField(default="", null=True, blank=True)

    poster = models.URLField(default=None, null=True, blank=True)
    imdbrating = models.DecimalField(
        default=None, max_digits=5, decimal_places=2, null=True, blank=True)
    imdbvotes = models.IntegerField(default=None, null=True, blank=True)
    imdbid = models.CharField(
        default=None, max_length=64, null=True, blank=True)
    boxoffice = models.IntegerField(default=None, null=True, blank=True)

    def __str__(self):
        return self.title

class Award(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=MAX_NAME_LENGTH, default=None)

    def __str__(self):
        return self.name

class Country(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=MAX_NAME_LENGTH, default=None)

    def __str__(self):
        return self.name

class Language(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=MAX_NAME_LENGTH, default=None)

    def __str__(self):
        return self.name


class Genre(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=MAX_NAME_LENGTH, default=None)

    def __str__(self):
        return self.name

class Person(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=MAX_NAME_LENGTH, default=None)

    def __str__(self):
        return self.name
