<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');

$result=[];
$sql="SELECT DISTINCT(uploader_provider) as providers FROM harentries " ;
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

echo json_encode($result);
?>