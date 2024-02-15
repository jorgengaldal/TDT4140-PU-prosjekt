import requests
import dotenv
from datetime import datetime

import pprint
pp = pprint.PrettyPrinter()


ENV_PATH = dotenv.find_dotenv()
OMDB_API_BASE_URL = "http://www.omdbapi.com"


# Variabler definert for kall til moviesdatabase

MB_API_BASE_URL = "https://moviesdatabase.p.rapidapi.com"

mb_headers = {
    'X-RapidAPI-Key': dotenv.get_key(ENV_PATH, "X-RapidAPI-Key"),
    'X-RapidAPI-Host': dotenv.get_key(ENV_PATH, "X-RapidAPI-Host")
}

mb_payload = {
    "list": "top_boxoffice_200",
    "page": 1,
}


# Variabler definert for kall til OMDb

OMBD_API_BASE_URL = "https://www.omdbapi.com/"


# Variabler definert for kall til backend

BACKEND_API_BASE_URL = "http://localhost:8000/api"
BACKEND_MOVIES_API_BASE_URL = f"{BACKEND_API_BASE_URL}/movies"
BACKEND_MOVIES_API_URL = f"{BACKEND_MOVIES_API_BASE_URL}/movies"
BACKEND_CATEGORY_API_URL = f"{BACKEND_MOVIES_API_BASE_URL}/categories"
BACKEND_GENRE_API_URL = f"{BACKEND_MOVIES_API_BASE_URL}/genres"
BACKEND_LANGUAGE_API_URL = f"{BACKEND_MOVIES_API_BASE_URL}/languages"
BACKEND_COUNTRY_API_URL = f"{BACKEND_MOVIES_API_BASE_URL}/countries"
BACKEND_PERSONS_API_URL = f"{BACKEND_MOVIES_API_BASE_URL}/persons"


while True:
    response = requests.get(
        url=f"{MB_API_BASE_URL}/titles", headers=mb_headers, params=mb_payload).json()
    
    print(f"DEBUG: Retrieving from page {mb_payload["page"]}")



    # Går gjennom responsen og lager nytt objekt med den interessante dataen hos filmene.
    for entry in response["results"]:
        movie_id = entry["id"]

        # Skip movie if already in database
        existing_entry = requests.get(
            url=f"{BACKEND_MOVIES_API_URL}/{movie_id}")
        if existing_entry.status_code != 404:
            continue

        print(f"POSTING {movie_id}")

        # Henter ekstra data fra ombd
        ombd_payload = {
            "apikey": dotenv.get_key(ENV_PATH, "OMBD-API-KEY"),
            "i": movie_id
        }
        movie_response = requests.get(
            url=OMBD_API_BASE_URL, params=ombd_payload).json()

        # People
        actors = movie_response["Actors"].split(", ")
        directors = movie_response["Director"].split(", ")
        writers = movie_response["Writer"].split(", ")

        people = actors + directors + writers

        for person in people:
            person_response = requests.get(
                f"{BACKEND_PERSONS_API_URL}/{person}/")
            if person_response.status_code == 404:
                # Add new person object if not present.
                requests.post(
                    url=f"{BACKEND_PERSONS_API_URL}/", data={"name": person})

        # Categories
        genres = movie_response["Genre"].split(", ")
        languages = movie_response["Language"].split(", ")
        # Bruker foreløpig ikke awards, da dette er på en suboptimal måte for å kunne brukes videre.
        # awards = movie_response["Awards"]
        countries = movie_response["Country"].split(", ")

        for genre in genres:
            genre_response = requests.get(
                f"{BACKEND_CATEGORY_API_URL}/{genre}/")
            if genre_response.status_code == 404:
                # Add new category object of type genre if not present
                data = {"name": genre, "category_type": 4}
                requests.post(url=f"{BACKEND_GENRE_API_URL}/", data=data)

        for language in languages:
            language_response = requests.get(
                f"{BACKEND_CATEGORY_API_URL}/{language}/")
            if language_response.status_code == 404:
                # Add new category object of type language if not present
                data = {"name": language, "category_type": 3}
                requests.post(url=f"{BACKEND_LANGUAGE_API_URL}/", data=data)

        for country in countries:
            country_response = requests.get(
                f"{BACKEND_CATEGORY_API_URL}/{country}/")
            if country_response.status_code == 404:
                # Add new category object of type country if not present
                data = {"name": country, "category_type": 2}
                requests.post(url=f"{BACKEND_COUNTRY_API_URL}/", data=data)

        movie = {
            "title": movie_response["Title"],
            "rated": movie_response["Rated"],
            "released": datetime.strptime(movie_response["Released"], "%d %b %Y").date().isoformat(),
            "runtime": int(movie_response["Runtime"].replace(" min", "")),
            "plot": movie_response["Plot"],
            "poster": entry["primaryImage"]["url"],
            "boxoffice": int(movie_response["BoxOffice"].replace(",", "").replace("$", "")),
            "imdbrating": movie_response["imdbRating"],
            "imdbvotes": int(movie_response["imdbVotes"].replace(",", "")),
            "imdbid": movie_id,
            "genres": genres,
            "awards": None,
            "countries": countries,
            "languages": languages,
            "actors": actors,
            "directors": directors,
            "writers": writers
        }

        # POST to backend
        requests.post(url=f"{BACKEND_MOVIES_API_URL}/", data=movie)

    if response["entries"] == 0:
        # Hopper ut av løkken hvis den ikke finner flere entries
        break
    else:
        mb_payload["page"] += 1