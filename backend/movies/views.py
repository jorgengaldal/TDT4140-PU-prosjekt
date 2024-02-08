from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Movie
from .serializers import MovieSerializer

# Create your views here.
class MovieListCreateView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    #Remove later
    permission_classes = [AllowAny]
    
