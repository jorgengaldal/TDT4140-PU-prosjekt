from django.urls import path
from . import views

urlpatterns = [
    path('movies/', views.MovieListView.as_view(), name='movie_list'),
    path('movies/<uuid:pk>/', views.AwardDetailView.as_view(), name='movie_detail'),
    path('awards/', views.AwardListView.as_view(), name='awards_list'),
    path('awards/<uuid:pk>/', views.AwardDetailView.as_view(), name='awards_detail'),
    path('countries/', views.CountryListView.as_view(), name='country_list'),
    path('countries/<uuid:pk>/', views.CountryDetailView.as_view(), name='country_detail'),
    path('languages/', views.LanguageListView.as_view(), name='language_list'),
    path('languages/<uuid:pk>/', views.LanguageDetailView.as_view(), name='language_detail'),
    path('genres/', views.GenreListView.as_view(), name='genre_list'),
    path('genres/<uuid:pk>/', views.GenreDetailView.as_view(), name='genre_detail'),
    path('persons/', views.PersonListView.as_view(), name='person_list'),
    path('persons/<uuid:pk>/', views.PersonDetailView.as_view(), name='person_detail'),

]
