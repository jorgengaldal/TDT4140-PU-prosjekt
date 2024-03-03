# Backend setup

Follow these steps to use the backend.

## Virtual Python Environment

### First setup

#### Windows
```bash
cd backend
python -m venv ".venv"
./.venv/Scripts/activate
python -m pip install -r requirements.txt
```

#### Mac
```bash
cd backend
python3 -m venv ".venv"
./.venv/bin/activate
python3 -m pip install -r requirements.txt
```

### Activation

#### Windows
```bash
./.venv/Scripts/activate
```

#### Mac
```bash
./.venv/bin/activate
```

### Deactivation


```bash
deactivate
```

### Installing new packages

After installing a new package via pip, use this command (in `backend`) to update the requirements.txt-file:

#### Windows
```bash
python -m pip freeze > requirements.txt
```

#### Mac
```bash
python3 -m pip freeze > requirements.txt
```

## Running the backend server

### First setup

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

## Populating the database

Use the premade dump of top 200 boxoffice movies:
```bash
cd backend
python manage.py loaddata fixtures/movies.json
python manage.py loaddata fixtures/users.json
```

Add movies and users:
```bash
cd backend
python manage.py loaddata preloaded_db.json
```


# Miscellaneous

## ER diagram

![ER](media\miscellaneuous\ER_diagram.png)

### Update ER diagram

Install Graphwiz https://graphviz.org/download/
```bash
python manage.py graph_models -a -g -o media\miscellaneuous\ER_diagram.png
```
