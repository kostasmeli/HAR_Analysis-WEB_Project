<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');

$sql="SELECT har FROM files";
$stmt=$conn->prepare($sql);
$stmt->execute();
$result=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);


$sql="SELECT COUNT(User_id) as user_numbers FROM user WHERE isAdmin=0";
$stmt=$conn->prepare($sql);
$stmt->execute();
$number=$stmt->get_result()->fetch_assoc();

echo json_encode([$result,$number]);
?>