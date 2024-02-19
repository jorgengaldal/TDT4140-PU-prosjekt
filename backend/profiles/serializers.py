from rest_framework import serializers
from .models import Profile
from reviews.models import MovieList
from reviews.serializers import MovieListSerializer
from collections import defaultdict

from typing import List

class ProfileSerializer(serializers.ModelSerializer):
    movie_lists = serializers.SerializerMethodField()
    genre_data = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = '__all__'

    def get_movie_lists(self, obj) -> List[MovieList]:
        related_movie_lists = obj.movie_lists.prefetch_related(
            'reviews__movie__genres'
        ).all()
        serializer = MovieListSerializer(related_movie_lists, many=True)
        return serializer.data

    def get_genre_data(self, obj):
        movie_lists = self.get_movie_lists(obj) 
        reviews_per_genre = defaultdict(int)
        favorites_per_genre = defaultdict(int)
        genre_ratings_total = defaultdict(float)
        genre_rating_counts = defaultdict(int)

        for movie_list in movie_lists:
            genre_data = movie_list["genre_data"]  
            for genre, amount_of_reviews in genre_data["reviews_per_genre"].items():
                reviews_per_genre[genre] += amount_of_reviews
            for genre, amount_of_favorites in genre_data["favorites_per_genre"].items():
                favorites_per_genre[genre] += amount_of_favorites
            for genre, rating_average in genre_data["genre_rating_averages"].items():
                total_reviews = genre_data["reviews_per_genre"][genre]
                genre_ratings_total[genre] += rating_average * total_reviews
                genre_rating_counts[genre] += total_reviews

        genre_rating_averages = {genre: genre_ratings_total[genre] / genre_rating_counts[genre] for genre in genre_ratings_total}

        return {
            "reviews_per_genre": dict(reviews_per_genre),
            "favorites_per_genre": dict(favorites_per_genre),
            "genre_rating_averages": dict(genre_rating_averages)
        }

