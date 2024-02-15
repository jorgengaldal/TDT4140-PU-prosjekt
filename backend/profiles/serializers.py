from typing import List
from rest_framework import serializers
from .models import Profile
from reviews.models import MovieList
from reviews.serializers import MovieListSerializer

class ProfileSerializer(serializers.ModelSerializer):
    movie_lists = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = '__all__'
    
    def get_movie_lists(self, obj) -> List[MovieList]:
        related_movie_lists = obj.movie_lists.all()
        serializer = MovieListSerializer(related_movie_lists, many=True)
        return serializer.data