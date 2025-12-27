<?php
include 'db.php';

$time = $_POST['time'] ?? null;
$message = $_POST['message'] ?? null;

if (!$time || !$message) {
    echo json_encode(["success" => false, "error" => "Données manquantes"]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO alarms (alarm_time, message) VALUES (?, ?)");
$stmt->execute([$time, $message]);

echo json_encode(["success" => true]);
?>
