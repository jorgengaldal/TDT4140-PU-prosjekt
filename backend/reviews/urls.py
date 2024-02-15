from django.urls import path
from . import views

urlpatterns = [
    path('moviereviews/', views.MovieReviewListView.as_view(), name='movie_review_list'),
    path('moviereviews/<uuid:pk>/', views.MovieReviewDetailView.as_view(), name='movie_review_detail'),
    path('movielist/', views.MovieListListView.as_view(), name='movie_list_list'),
    path('movielist/<uuid:pk>/', views.MovieListDetailView.as_view(), name='movie_list_detail'),
]
