from flask import Flask, jsonify, request, make_response
from flask_cors import CORS  # Ajout du module CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Active CORS pour toutes les routes

# Exemple de messages stockés
messages = [
    {"date": "2025-03-25", "time": "14:30", "user": "Alice", "msg": "Hello, how are you?"},
    {"date": "2025-03-25", "time": "14:31", "user": "Bob", "msg": "I'm fine, thanks!"},
]

# Stockage temporaire des utilisateurs et messages (simulation d'une base de données)
users = {}  # Stocke les utilisateurs sous forme { "username": { "password": "hashed_pwd", "email": "email@example.com" } }

@app.route("/chatget", methods=["GET"])
def get_messages():
    return jsonify(messages)

# Route pour envoyer un message
@app.route("/chatsend", methods=["POST"])
def send_message():
    data = request.json  # Récupérer les données envoyées en JSON
    message_text = data.get("msg", "").strip()

    if not message_text:
        return jsonify({"num": 1, "msg": "Message cannot be empty"}), 400

    new_message = {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "time": datetime.now().strftime("%H:%M:%S"),
        "user": "Anonymous",  # A remplacer par un vrai système d'authentification
        "msg": message_text
    }

    messages.append(new_message)  # Ajouter le message en mémoire

    return jsonify({"num": 0, "msg": "Message sent successfully"}), 200

# Route d'inscription
@app.route("/register", methods=["POST"])
def register():
    username = request.form.get("username")
    password = request.form.get("userpwd")
    email = request.form.get("useremail")
    firstname = request.form.get("firstname")
    lastname = request.form.get("lastname")

    if not username or not password or not email:
        return jsonify({"num": 1, "msg": "All fields are required"}), 400

    if username in users:
        return jsonify({"num": 1, "msg": "Username already taken"}), 400

    users[username] = {"password": password, "email": email, "firstname": firstname, "lastname": lastname}
    return jsonify({"num": 0, "msg": "Registration successful"}), 201

@app.route("/login", methods=["POST"])
def login():
    # Récupération des données envoyées par le client
    username = request.form.get("username")
    password = request.form.get("userpwd")

    # Vérification si les champs sont vides
    if not username or not password:
        return make_response("Missing username or password", 400)

    # Vérification des identifiants utilisateur
    if username not in users or users[username]["password"] != password:
        return make_response("Invalid username or password", 200)

    # Si l'utilisateur existe et que le mot de passe est correct
    full_name = f"Bonjour {users[username]['firstname']} {users[username]['lastname']}"

    return make_response(full_name, 200)  # Retourne le message en texte brut avec code 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
