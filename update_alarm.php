<?php include 'db.php';

$id = $_POST['id'] ?? null;
if (!$id) {
    echo json_encode(["success" => false, "error" => "ID manquant"]);
    exit;
}

$stmt = $pdo->prepare("UPDATE alarms SET triggered = 1 WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(["success" => true]);
?>
