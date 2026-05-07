from flask import Flask, request, jsonify, send_from_directory
import pymysql
import os

app = Flask(__name__)

# --- Configuration de la base de données ---
# Adaptez ces paramètres en fonction de votre base MySQL (ex: XAMPP, WAMP, etc.)
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = 'Daniel12349'
DB_NAME = 'BDD'

def get_db_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )

# --- Routes pour servir le Front-End (HTML, CSS, JS, etc.) ---
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(path):
        return send_from_directory('.', path)
    return "Fichier non trouvé", 404

# --- Route API pour l'enregistrement de la réservation ---
@app.route('/api/save_reservation', methods=['POST'])
def save_reservation():
    data = request.json
    if not data:
        return jsonify({'error': 'Aucune donnée reçue'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        sql = """INSERT INTO reservations 
                 (nom, prenom, email, date_reservation, nombre_tables, nombre_convives, prix) 
                 VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        
        # Insertion sécurisée contre les injections SQL
        cursor.execute(sql, (
            data.get('nom'), data.get('prenom'), data.get('email'),
            data.get('date_reservation'), data.get('tables'),
            data.get('convives'), data.get('prix')
        ))
        
        conn.commit()
        conn.close()
        
        return jsonify({'success': True}), 200
        
    except Exception as e:
        print("Erreur Serveur :", e)
        return jsonify({'error': "Erreur lors de l'enregistrement en base"}), 500

if __name__ == '__main__':
    print("Démarrage du serveur sur http://127.0.0.1:5000 ...")
    app.run(debug=True, port=5000)
