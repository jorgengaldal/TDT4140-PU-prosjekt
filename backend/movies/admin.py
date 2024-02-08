from django.contrib import admin
from .models import Movie, Person, Genre, Language, Award,  Country

class PersonAdmin(admin.ModelAdmin):
    list_display = ('name',) 
    readonly_fields = ('acted_movies_list',"written_movies_list", "directed_movies_list")  

    def directed_movies_list(self, obj):
        return ", ".join([movie.title for movie in obj.directed_movies.all()])
    def acted_movies_list(self, obj):
        return ", ".join([movie.title for movie in obj.acted_movies.all()])
    def written_movies_list(self, obj):
        return ", ".join([movie.title for movie in obj.written_movies.all()])
    
    directed_movies_list.short_description = 'Directed Movies'
    acted_movies_list.short_description = 'Acted Movies'  
    written_movies_list.short_description = 'Written Movies'  

class GenreAdmin(admin.ModelAdmin):
    list_display = ("name",)
    readonly_fields = ("movies_list",)  

    def movies_list(self, obj):
        return ", ".join([movie.title for movie in obj.movies.all()])
    movies_list.short_description = "Movies"

admin.site.register(Genre, GenreAdmin)
admin.site.register(Person, PersonAdmin)
admin.site.register(Language)
admin.site.register(Award)
admin.site.register(Country)
admin.site.register(Movie)  
