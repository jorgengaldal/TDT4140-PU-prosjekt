from typing import List
from rest_framework import serializers
from .models import MovieList, MovieReview

from django_typomatic import ts_interface, generate_ts


@ts_interface
class MovieReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieReview
        fields = '__all__'


@ts_interface
class MovieListSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = MovieList
        fields = '__all__'

    def get_reviews(self, obj) -> List[MovieReview]:
        related_reviews = obj.reviews.all()
        serializer = MovieReviewSerializer(related_reviews, many=True)
        return serializer.data

generate_ts('../frontend/backendTypes.ts')