from typing import List
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Movie, Person, Category
from django.db.models import Avg


class MovieSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = '__all__'

    def get_average_rating(self, obj) -> float:
        average = obj.reviews.aggregate(Avg('rating'))['rating__avg']
        if average is None:
            return 0
        return round(average, 2)


class CategorySerializer(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = '__all__'

    def get_movies(self, obj) -> List[Movie]:
        if obj.category_type == 1:
            related_movies = obj.award_movies.all()
        elif obj.category_type == 2:
            related_movies = obj.country_movies.all()
        elif obj.category_type == 3:
            related_movies = obj.language_movies.all()
        elif obj.category_type == 4:
            related_movies = obj.genre_movies.all()
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data


class PersonSerializer(serializers.ModelSerializer):
    acted_movies = serializers.SerializerMethodField()
    written_movies = serializers.SerializerMethodField()
    directed_movies = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = '__all__'

    def get_directed_movies(self, obj) -> List[Movie]:
        related_movies = obj.directed_movies.all()
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data

    def get_acted_movies(self, obj) -> List[Movie]:
        related_movies = obj.acted_movies.all()
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data

    def get_written_movies(self, obj) -> List[Movie]:
        related_movies = obj.written_movies.all()
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data
