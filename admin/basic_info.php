<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');

$result=[];

//a
$sql="SELECT COUNT(User_id) as user_numbers FROM user WHERE isAdmin=0";
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_assoc();
$result[]=$res["user_numbers"];

//b
$sql="SELECT method,COUNT(method) as count_method FROM harentries GROUP BY method";
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

//c
$sql="SELECT status,COUNT(status) as count_status FROM harentries GROUP BY status";
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

//d
$sql="SELECT COUNT(DISTINCT(url)) as count_url FROM harentries";
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_assoc();
$result[]=$res["count_url"];

//d
$sql="SELECT COUNT(DISTINCT(uploader_provider)) as count_provider FROM harentries";
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_assoc();
$result[]=$res["count_provider"];

//f
$sql="SELECT response_content_type,avg(response_age) as avg_age from harentries group by response_content_type";
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;
echo json_encode($result);
?>