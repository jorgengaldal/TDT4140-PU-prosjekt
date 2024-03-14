from django.contrib import admin
from .models import MovieReview, MovieList, LikedNotMovie

admin.site.register(MovieList)
admin.site.register(MovieReview)
admin.site.register(LikedNotMovie)