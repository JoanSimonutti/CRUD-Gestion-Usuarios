# Proyecto React-Flask-CRUD

<img src="assets/app-pic-01.png" alt="App-Pic" width="100%">

### - Para levantar el backend:

```bash
source venv/bin/activate
python src/app.py
```

### - Para levantar la base de datos:

```bash
mongosh
```

### - Para levantar el frontend:

```bash
npm start
```

# ¿Qué es CRUD?

CRUD es el acrónimo de las operaciones más comunes en bases de datos:

- **C**reate (Crear)
- **R**ead (Leer)
- **U**pdate (Actualizar)
- **D**elete (Eliminar)

Estas operaciones permiten crear, consultar, modificar y eliminar datos en una aplicación.

---

## 1. Backend (Python + Flask + MongoDB)

### 📗 Paso a paso

1. Crear una carpeta llamada `react-flask-crud`.
2. Dentro de ella, crear una carpeta `backend`.
3. Abrir la carpeta `backend` en VSCode.
4. Desde la terminal, instalar virtualenv:

```bash
pip install virtualenv
```

5. Crear un entorno virtual:

```bash
virtualenv venv
```

6. Activar el entorno virtual:

```bash
source venv/bin/activate
```

7. Instalar las dependencias necesarias:

```bash
pip install flask Flask-PyMongo flask-cors
```

8. Crear una carpeta `src` dentro de `backend`, y dentro de `src`, un archivo `app.py`.

### 🔍 Explicación de las dependencias

- `Flask`: framework para crear el servidor.
- `Flask-PyMongo`: permite conectar Flask con MongoDB.
- `flask-cors`: habilita la comunicación entre servidores distintos (por ejemplo, Flask y React durante desarrollo).

### 🔧 Configuración inicial en `app.py`

```python
from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS

app.config['MONGO_URI'] = 'mongodb://localhost:27017/pythonreactdb'
mongo = PyMongo(app)
db = mongo.db.users

@app.route('/')
def index():
    return '<h1>HELLO WORLD</h1>'

if __name__ == '__main__':
    app.run(debug=True)
```

9. Ejecutar el servidor:

```bash
python src/app.py
```

Abre tu navegador en `http://localhost:5000` y deberías ver "HELLO WORLD".

---

## 📂 Rutas CRUD

| Método | Ruta          | Acción                     |
| ------ | ------------- | -------------------------- |
| POST   | `/users`      | Crear usuario              |
| GET    | `/users`      | Obtener todos los usuarios |
| GET    | `/user/<id>`  | Obtener un usuario por ID  |
| PUT    | `/users/<id>` | Actualizar usuario por ID  |
| DELETE | `/users/<id>` | Eliminar usuario por ID    |

---

## 🔢 MongoDB: comandos básicos en shell

1. Asegúrate de tener MongoDB instalado y corriendo:

```bash
sudo systemctl status mongod
```

2. Ingresar al shell de MongoDB:

```bash
mongosh
```

3. Comandos últiles:

```bash
show dbs              # Muestra todas las bases de datos
use pythonreactdb     # Accede a la base de datos
show collections      # Muestra las colecciones dentro de la base
db.users.find()       # Lista todos los documentos en la colección "users"
```

---

## 2. Frontend (React)

### 🚀 Crear el proyecto

Desde la carpeta `python-react-crud`, ejecutar:

```bash
npx create-react-app frontend
```

Una vez creado, ingresar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install react-router-dom bootswatch
```

### 🎓 Scripts disponibles

```bash
npm start         # Ejecuta en modo desarrollo
npm run build     # Construye para producción
npm test          # Corre pruebas
npm run eject     # Expone la configuración completa (irreversible)
```

### 📅 Recursos oficiales

- [Documentación de Create React App](https://create-react-app.dev)
- [Documentación de React](https://reactjs.org)
- [Documentación de Flask](https://flask.palletsprojects.com/)
- [Documentación de MongoDB](https://www.mongodb.com/docs/)

---

Documento creado por Joan Simonutti para guiar en la creacion de una aplicación full stack simple utilizando React, Flask, MongoDB.
