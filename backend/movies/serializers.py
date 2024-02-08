from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Movie, Award, Country, Person, Genre, Language

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'



class AwardSerializer(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField()

    class Meta:
        model = Award
        fields = '__all__'

    def get_movies(self, obj):
        related_movies = obj.movies.all() 
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data

class CountrySerializer(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField()

    class Meta:
        model = Country
        fields = '__all__'

    def get_movies(self, obj):
        related_movies = obj.movies.all() 
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data

class PersonSerializer(serializers.ModelSerializer):
    acted_movies = serializers.SerializerMethodField()
    written_movies = serializers.SerializerMethodField()
    directed_movies = serializers.SerializerMethodField()

    class Meta:
        model = Person
        fields = '__all__'

    def get_directed_movies(self, obj):
        related_movies = obj.directed_movies.all() 
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data
    def get_acted_movies(self, obj):
        related_movies = obj.acted_movies.all()
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data
    def get_written_movies(self, obj):
        related_movies = obj.written_movies.all()
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data

class LanguageSerializer(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField()

    class Meta:
        model = Language
        fields = '__all__'

    def get_movies(self, obj):
        related_movies = obj.movies.all()
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data

class GenreSerializer(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField()

    class Meta:
        model = Genre
        fields = '__all__'

    def get_movies(self, obj):
        related_movies = obj.movies.all()
        serializer = MovieSerializer(related_movies, many=True)
        return serializer.data