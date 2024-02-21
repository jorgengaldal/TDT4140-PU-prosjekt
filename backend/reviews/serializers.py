from collections import defaultdict
from rest_framework import serializers
from .models import MovieList, MovieReview
from movies.models import Movie
from movies.serializers import MovieSerializer
from django.db.models import Prefetch
from django_typomatic import ts_interface, generate_ts
from typing import List

class MovieListSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField()
    genre_data = serializers.SerializerMethodField()

    class Meta:
        model = MovieList
        fields = '__all__'

    def get_reviews(self, obj) -> List[MovieReview]:
        # This is where you could optimize the query if necessary
        related_reviews = obj.reviews.all()
        serializer = MovieReviewSerializer(related_reviews, many=True)
        return serializer.data

    def get_genre_data(self, obj):
        reviews = obj.reviews.prefetch_related(
            Prefetch('movie', queryset=Movie.objects.all().prefetch_related('genres'))
        ).all()

        reviews_per_genre = defaultdict(int)
        favorites_per_genre = defaultdict(int)
        genre_ratings = defaultdict(int)
        genre_rating_counts = defaultdict(int)

        for review in reviews:
            movie = review.movie
            for genre in movie.genres.all():
                genre_name = genre.name
                if review.rating is not None:
                    reviews_per_genre[genre_name] += 1
                    genre_ratings[genre_name] += review.rating
                    genre_rating_counts[genre_name] += 1
                if review.is_favorite:
                    favorites_per_genre[genre_name] += 1

        genre_rating_averages = {
            genre: genre_ratings[genre] / genre_rating_counts[genre]
            for genre in genre_ratings
        }

        return {
            "reviews_per_genre": dict(reviews_per_genre),
            "favorites_per_genre": dict(favorites_per_genre),
            "genre_rating_averages": genre_rating_averages
        }



# @ts_interface
class MovieReviewSerializer(serializers.ModelSerializer):
    movie = serializers.PrimaryKeyRelatedField(queryset=Movie.objects.all(), write_only=True)

    class Meta:
        model = MovieReview
        fields = '__all__'

    def create(self, validated_data):
        movie_data = validated_data.pop('movie')
        movie_review_instance = MovieReview.objects.create(movie=movie_data, **validated_data)
        return movie_review_instance

        
generate_ts('../frontend/backendTypes.ts')
