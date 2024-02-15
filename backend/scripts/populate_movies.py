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
    "list": "top_boxoffice_200"
}


# Variabler definert for kall til OMDb

OMBD_API_BASE_URL = "https://www.omdbapi.com/"


# Variabler definert for kall til backend

BACKEND_API_BASE_URL = "http://localhost:8000/api"

response = requests.get(
    url=f"{MB_API_BASE_URL}/titles", headers=mb_headers, params=mb_payload).json()

# Går gjennom responsen og lager nytt objekt med den interessante dataen hos filmene.
movies = []
for entry in response["results"]:
    movie_id = entry["id"]
    print(f"{movie_id}")

    # Henter ekstra data fra ombd
    ombd_payload = {
        "apikey": dotenv.get_key(ENV_PATH, "OMBD-API-KEY"),
        "i": movie_id
    }
    movie_response = requests.get(url=OMBD_API_BASE_URL, params=ombd_payload).json()

    actors = movie_response["Actors"].split(", ")
    genres = movie_response["Genre"].split(", ")
    director = movie_response["Director"]

    people = actors + [director]
    # TODO: check if actor exists.

    for person in people:
        person_response = requests.get(f"{BACKEND_API_BASE_URL}/movies/persons/{person}/")
        if person_response.status_code == 404:
            # Add new person object if not present.
            requests.post(url=f"{BACKEND_API_BASE_URL}/movies/persons/", data={"name": person})


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
        "genres": None,
        # "genres": genres,
        "awards": None,
        "countries": None,
        "languages": None,
        "actors": actors,
        "directors": [director],
        "writers": None
    }

    # POST to backend
    requests.post(url=f"{BACKEND_API_BASE_URL}/movies/movies/", data=movie)

    movies.append(movie)

# pp.pprint(movies)
