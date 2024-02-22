from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
import uuid

from django.forms import ValidationError

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

    genres = models.ManyToManyField(
        "Category", related_name="genre_movies", default=None, blank=True)
    awards = models.ManyToManyField(
        "Category", related_name="award_movies", default=None, blank=True)
    countries = models.ManyToManyField(
        "Category", related_name="country_movies", default=None, blank=True)
    languages = models.ManyToManyField(
        "Category", related_name="language_movies", default=None, blank=True)

    actors = models.ManyToManyField(
        "Person", related_name="acted_movies", default=None, blank=True)
    directors = models.ManyToManyField(
        "Person", related_name="directed_movies", default=None, blank=True)
    writers = models.ManyToManyField(
        "Person", related_name="written_movies", default=None, blank=True)

    plot = models.TextField(default="", null=True, blank=True)

    poster = models.URLField(default=None, null=True, blank=True)
    imdbrating = models.DecimalField(
        default=None, max_digits=5, decimal_places=2, null=True, blank=True)
    imdbvotes = models.IntegerField(default=None, null=True, blank=True)
    imdbid = models.CharField(
        default=None, max_length=64, null=True, blank=True, unique=True)
    boxoffice = models.IntegerField(default=None, null=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        for category in self.awards.all():
            if category.categor_type != 1:
                raise ValidationError(
                    "All awards must have the category_type of 1.")
        for category in self.countries.all():
            if category.category_type != 2:
                raise ValidationError(
                    "All countries must have the category-type of 2.")
        for category in self.languages.all():
            if category.category_type != 3:
                raise ValidationError(
                    "All langauges must have the category-type of 3.")
        for category in self.genres.all():
            if category.category_type != 4:
                raise ValidationError(
                    "All genres must have the category_type of 4.")
        super().save(*args, **kwargs)



class Category(models.Model):
    name = models.CharField(max_length=MAX_NAME_LENGTH, primary_key=True)

    CATEGORY_TYPES = (
        (1, 'Award'),
        (2, 'Country'),
        (3, 'Language'),
        (4, 'Genre'),
    )

    category_type = models.IntegerField(choices=CATEGORY_TYPES)

    def __str__(self):
        category_name = ""
        for category_type in self.CATEGORY_TYPES:
            if category_type[0] == self.category_type:
                category_name = category_type[1]
        return f'{self.name} ({category_name})'


class Person(models.Model):
    name = models.CharField(max_length=MAX_NAME_LENGTH, primary_key=True)

    #imdb_id = models.CharField(
    #    max_length=MAX_NAME_LENGTH, default=None, blank=True)

    def __str__(self):
        return self.name
