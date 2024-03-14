from django.http import Http404
from django.shortcuts import render, get_object_or_404
from rest_framework import generics, permissions, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from profiles.models import Profile

from .models import MovieReview, MovieList, LikedNotMovie
from .serializers import MovieListSerializer, MovieReviewDetailSerializer, MovieReviewCreateSerializer, LikedNotMovieSerializer, LikedNotMovieCreateSerializer

class MovieReviewListView(generics.ListCreateAPIView):
    queryset = MovieReview.objects.all()
    model = MovieReview
    
    def post(self, request, *args, **kwargs):
        try:
            if not "movie_list" in request.data:
                request.data["movie_list"] = get_object_or_404(Profile, user=self.request.user).my_movie_list.id
        except (ValueError, Http404, AttributeError):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return self.create(request, *args, **kwargs)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return MovieReviewCreateSerializer
        return MovieReviewDetailSerializer
    permission_classes = [AllowAny]

class MovieReviewDetailView(generics.RetrieveUpdateAPIView):
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

class LikedNotMovieListView(generics.ListCreateAPIView):
    model = LikedNotMovie
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return LikedNotMovieCreateSerializer
        return LikedNotMovieSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            profile = Profile.objects.filter(user=user).first()
            return profile.liked_notmovies.all()
        else:
            return LikedNotMovie.objects.all()
    
