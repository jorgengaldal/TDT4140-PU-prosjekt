from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile
from reviews.models import MovieList

@receiver(post_save, sender=Profile)
def create_movie_list_for_profile(sender, instance, created, **kwargs):
    if created:
        movie_list = MovieList.objects.create(name="My Movie List")
        movie_list.owners.add(instance)
        instance.my_movie_list = movie_list
        instance.save()
