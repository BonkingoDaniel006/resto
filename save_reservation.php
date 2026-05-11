<?php
header('Content-Type: application/json');

// --- Configuration de la base de données ---
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASSWORD = 'Daniel12349';
$DB_NAME = 'BDD';

try {
    // Connexion à la base de données avec PDO
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASSWORD);
    
    // Configurer PDO pour lever des exceptions en cas d'erreur
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérifier si la méthode de requête est bien POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Méthode non autorisée']);
        exit;
    }

    // Récupération des données JSON envoyées en POST
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Aucune donnée reçue']);
        exit;
    }

    // Préparation de la requête sécurisée contre les injections SQL
    $sql = "INSERT INTO reservations 
            (nom, prenom, email, date_reservation, nombre_tables, nombre_convives, prix) 
            VALUES (:nom, :prenom, :email, :date_reservation, :tables, :convives, :prix)";
    
    $stmt = $pdo->prepare($sql);
    
    // Exécution de la requête
    $stmt->execute([
        ':nom'              => $data['nom'] ?? null,
        ':prenom'           => $data['prenom'] ?? null,
        ':email'            => $data['email'] ?? null,
        ':date_reservation' => $data['date_reservation'] ?? null,
        ':tables'           => $data['tables'] ?? null,
        ':convives'         => $data['convives'] ?? null,
        ':prix'             => $data['prix'] ?? null
    ]);

    http_response_code(200);
    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => "Erreur lors de l'enregistrement en base", 'details' => $e->getMessage()]);
}
