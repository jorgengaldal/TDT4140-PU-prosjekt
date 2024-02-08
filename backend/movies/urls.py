from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MovieListCreateView.as_view(), name='movie_list_create'),
]
