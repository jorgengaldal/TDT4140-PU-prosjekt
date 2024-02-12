from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Movie, Category, Person
from .serializers import MovieSerializer, PersonSerializer, CategorySerializer


class MovieListView(generics.ListCreateAPIView):
    model = Movie
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [AllowAny]


class MovieDetailView(generics.GenericAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, validated_data):
        actor_names = validated_data.pop('actors', [])
        movie = Movie.objects.create(**validated_data)
        for name in actor_names:
            actor, created = Person.objects.get_or_create(name=name)
            movie.actors.add(actor)
        return movie


class AwardsListView(generics.ListCreateAPIView):
    model = Category
    queryset = Category.objects.filter(category_type=1)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class CountriesListView(generics.ListCreateAPIView):
    model = Category
    queryset = Category.objects.filter(category_type=2)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class LanguagesListView(generics.ListCreateAPIView):
    model = Category
    queryset = Category.objects.filter(category_type=3)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class GenresListView(generics.ListCreateAPIView):
    model = Category
    queryset = Category.objects.filter(category_type=4)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class CategoryDetailView(generics.GenericAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "name"

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PersonListView(generics.ListCreateAPIView):
    model = Person
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [AllowAny]


class PersonDetailView(generics.CreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        obj = queryset.get(pk=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
