from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
import uuid

# Create your models here.
class Movie(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    # user = models.ForeignKey(User, related_name='decks', on_delete=models.CASCADE, default=None)
    created_at = models.DateTimeField(default=datetime.now, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    rated = models.CharField(default=None, max_length=64, null=True, blank=True)
    released = models.DateField(default=None, null=True, blank=True)
    runtime = models.IntegerField(default=None, null=True, blank=True)
    # Genre TODO
    # Director TODO
    # Writer TODO
    # Actors TODO
    plot = models.TextField(default="", null=True, blank=True)
    # Language TODO
    # Country TODO
    # Awards TODO
    poster = models.URLField(default=None, null=True, blank=True)
    
    # "Ratings": [
    #    {
    #    "Source": "Internet Movie Database",
    #    "Value": "7.8/10"
    #    },
    #    {
    #    "Source": "Rotten Tomatoes",
    #    "Value": "85%"
    #    },
    #    {
    #    "Source": "Metacritic",
    #    "Value": "72/100"
    #    }
    # ],
    # metascore = models.IntegerField(default=None)
    imdbrating = models.DecimalField(default=None, max_digits=5, decimal_places=2, null=True, blank=True)
    imdbvotes = models.IntegerField(default=None, null=True, blank=True)
    imdbid = models.CharField(default=None, max_length=64, null=True, blank=True)
    boxoffice = models.IntegerField(default=None, null=True, blank=True)

    
    def __str__(self):
        return self.title
    
