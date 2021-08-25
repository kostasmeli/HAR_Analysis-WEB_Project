<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');

$sql="SELECT har FROM files";
$stmt=$conn->prepare($sql);
$stmt->execute();
$result=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);

echo json_encode($result);
?>