<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');


$result=[];
$sql="SELECT DISTINCT(server_lat_long) as loc FROM harentries ";
$stmt= $conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

$sql="SELECT uploader_lat_long, COUNT(DISTINCT(uploader)) as numberofuploaders FROM harentries GROUP BY uploader_lat_long;";
$stmt= $conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

$sql="SELECT uploader_lat_long,server_lat_long as loc ,COUNT(server_lat_long) as count FROM harentries GROUP BY server_lat_long,uploader";
$stmt= $conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

$sql="SELECT MAX(count) as maximum FROM(SELECT server_lat_long as loc,COUNT(server_lat_long) as count FROM harentries  GROUP BY server_lat_long) AS T" ;
$stmt= $conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

echo json_encode($result);
?>