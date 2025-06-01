# Importaciones:
from flask import Flask, request, jsonify # Flask: el framework principal para crear la aplicación web. request: permite acceder a los datos que envía el cliente (como POST, PUT, etc.). jsonify: convierte datos Python (diccionarios, listas) a formato JSON para las respuestas. 
from flask_pymongo import PyMongo # Proporciona una manera sencilla de conectar Flask con MongoDB.
from flask_cors import CORS # Habilita CORS (Cross-Origin Resource Sharing) para que tu frontend (por ejemplo, hecho con React) pueda hacer peticiones al backend sin bloqueos por política de seguridad del navegador.
from bson.objectid import ObjectId # ObjectId es el tipo de dato que usa MongoDB como identificador (_id). Necesitamos esta clase para poder buscar o convertir IDs.


# Configuración de la App:
app = Flask(__name__) # Crea una instancia de la aplicación Flask.
app.config['MONGO_URI'] = 'mongodb://localhost:27017/pythonreactdb' # Configura la cadena de conexión a MongoDB. Se conecta a la base de datos llamada "pythonreactdb".
mongo = PyMongo(app) # Crea un cliente de MongoDB con Flask y lo vincula a la app.

CORS(app)  # Activa CORS, para permitir que React (u otro frontend) pueda consumir la API desde otro dominio o puerto (por ejemplo, localhost:3000).

db = mongo.db.users # Apunta a la colección users dentro de la base de datos. Así, puedes hacer operaciones como insert_one, find, etc.


# Ruta POST: Crear usuario
@app.route('/users', methods=['POST'])
def createUser():                       # Crea una ruta POST /users para agregar un nuevo usuario.
    user_data = {
        'name': request.json['name'],   # Toma los datos enviados por el cliente (en formato JSON) y los guarda en un diccionario.
        'email': request.json['email'], 
        'password': request.json['password']
    }
    result = db.insert_one(user_data)   # Inserta este nuevo usuario en la colección users.
    return jsonify({'id': str(result.inserted_id)}), 201  # Devuelve el ID generado por MongoDB para ese usuario en formato JSON, con el código 201 (creado).


# Ruta GET: Obtener todos los usuarios
@app.route('/users', methods=['GET']) 
def getUsers():                         # Ruta GET para obtener todos los usuarios.
    users = []                          # db.find() recorre todos los documentos (usuarios). Se construye una lista vacía "[]" para guardarlos.
    for doc in db.find():               
        users.append({
            '_id': str(ObjectId(doc['_id'])),  # Se convierte el _id a string para que sea serializable en JSON. Se agregan los demás campos al diccionario.
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(users)  # Devuelve la lista completa de usuarios.       
    

# Ruta GET: Obtener un usuario por ID    
@app.route('/user/<id>', methods=['GET'])      # Ruta GET /user/<id> para obtener un único usuario por su ID.
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})  # Busca el usuario en la base de datos por su _id.
    return jsonify({  
         '_id': str(ObjectId(user['_id'])),    # Devuelve los datos del usuario.
         'name': user['name'],
         'email': user['email'],
         'password': user['password']
    })  


# Ruta DELETE: Eliminar un usuario
@app.route('/users/<id>', methods=['DELETE'])  # Ruta DELETE /users/<id> para eliminar un usuario por su ID.
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})     # Borra el usuario con ese ID.
    return jsonify({'msg': 'User deleted'})  # Devuelve un mensaje de confirmación.


# Ruta PUT: Actualizar un usuario
@app.route('/users/<id>', methods=['PUT'])  # Ruta PUT /users/<id> para actualizar un usuario existente.
def updateUser(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {  # Busca el usuario por ID y reemplaza los campos indicados con los nuevos valores enviados por el cliente.
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password']
    }})
    return jsonify({'msg': 'User update'})  # Devuelve un mensaje de confirmación.


# Ejecución principal de la app
if __name__ == "__main__":  # Esto permite que Flask arranque el servidor web si el archivo se ejecuta directamente.
    app.run(debug=True)     # debug=True habilita el modo desarrollador (auto recarga y mensajes de error detallados).
