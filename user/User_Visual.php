<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');
session_start();
$username=$_SESSION["username"];

$usersql="SELECT User_id FROM user WHERE username=? AND isAdmin=0";
$stmt = $conn->prepare($usersql); 
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result(); 
$user_array = $result->fetch_assoc(); 
$userid=$user_array["User_id"];

$sql="SELECT server_lat_long,COUNT(server_lat_long) as count FROM harentries WHERE uploader=? GROUP BY server_lat_long ";
$stmt=$conn->prepare($sql);
$stmt->bind_param("i",$userid);
$stmt->execute();
$result=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
echo json_encode($result);
?>