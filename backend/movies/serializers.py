from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Movie, Award, Country, Person

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class AwardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Award
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'