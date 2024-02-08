from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'