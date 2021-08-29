<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');

$result=[];
$sql="SELECT avg(wait) as avgwait,HOUR(startedDateTime) as hour from harentries group by HOUR(startedDateTime)";
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

$sql="SELECT weekday,avg(wait) as avgwait ,HOUR(startedDateTime) as hour FROM harentries GROUP BY HOUR(startedDateTime),weekday";
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

$sql="SELECT method,avg(wait) as avgwait, HOUR(startedDateTime) as hour FROM harentries GROUP BY method,HOUR(startedDateTime)";
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

$sql="SELECT uploader_provider,avg(wait) as avgwait, HOUR(startedDateTime) as hour FROM harentries GROUP BY uploader_provider,HOUR(startedDateTime)";
$stmt=$conn->prepare($sql);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

echo json_encode($result);
?>