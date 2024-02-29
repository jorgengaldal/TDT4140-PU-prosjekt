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


<<<<<<< e8e7c49a991378976ae554aebffa7e2a5aa90bbd
=======
class SimpleMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["id", "title", "poster", "imdbid"]



@ts_interface()
>>>>>>> 8007ca7c3f80be02c7a8c20d6d739a3084b11d14
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
        serializer = SimpleMovieSerializer(related_movies, many=True, context=self.context)
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
        serializer = MovieSerializer(related_movies, many=True, context=self.context)
        return serializer.data

    def get_acted_movies(self, obj) -> List[Movie]:
        related_movies = obj.acted_movies.all()
        serializer = MovieSerializer(related_movies, many=True, context=self.context)
        return serializer.data

    def get_written_movies(self, obj) -> List[Movie]:
        related_movies = obj.written_movies.all()
        serializer = MovieSerializer(related_movies, many=True, context=self.context)
        return serializer.data
