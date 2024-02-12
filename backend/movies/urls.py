from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MovieListView.as_view(), name='movie_list'),
    path('movies/<uuid:pk>/', views.MovieDetailView.as_view(), name='movie_detail'),
    path('categories/<str:name>', views.CategoryDetailView.as_view(), name='categories_detail'),
    path('awards/', views.AwardsListView.as_view(), name='awards_list'),
    path('countries/', views.CountriesListView.as_view(), name='countries_list'),
    path('languages/', views.LanguagesListView.as_view(), name='langauges_list'),
    path('genres/', views.GenresListView.as_view(), name='genres_list'),
    path('persons/', views.PersonListView.as_view(), name='person_list'),
    path('persons/<uuid:pk>/', views.PersonDetailView.as_view(), name='person_detail'),

]
