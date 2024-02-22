from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import MovieReview, MovieList
from .serializers import MovieListSerializer, MovieReviewDetailSerializer, MovieReviewCreateSerializer

class MovieReviewListView(generics.ListCreateAPIView):
    queryset = MovieReview.objects.all()
    model = MovieReview
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return MovieReviewCreateSerializer
        return MovieReviewDetailSerializer
    permission_classes = [AllowAny]

class MovieReviewDetailView(generics.GenericAPIView):
    queryset = MovieReview.objects.all()
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return MovieReviewCreateSerializer
        return MovieReviewDetailSerializer
    permission_classes = [permissions.AllowAny]

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

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_delete(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_delete(self, instance):
        instance.delete()

class MovieListListView(generics.ListCreateAPIView):
    queryset = MovieList.objects.all()
    model = MovieList    
    serializer_class = MovieListSerializer
    permission_classes = [AllowAny]

class MovieListDetailView(generics.GenericAPIView):
    queryset = MovieList.objects.all()
    serializer_class = MovieListSerializer
    permission_classes = [permissions.AllowAny]

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

