## Running the backend server

### First setup

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

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