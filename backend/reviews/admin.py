from django.contrib import admin
from .models import MovieReview, MovieList

admin.site.register(MovieList)
admin.site.register(MovieReview)