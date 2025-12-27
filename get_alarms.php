<?php include 'db.php';

$stmt = $pdo->query("SELECT * FROM alarms ORDER BY alarm_time ASC");
$alarms = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($alarms);
?>
