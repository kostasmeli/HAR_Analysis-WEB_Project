<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');
$provider=$_POST['provider'];

$result=[];
$sql="SELECT response_content_type,response_cache_control FROM harentries WHERE uploader_provider=? GROUP BY response_content_type,response_cache_control";
$stmt=$conn->prepare($sql);
$stmt->bind_param('s',$provider);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

$sql="SELECT response_content_type,COUNT(response_content_type)as count FROM harentries WHERE uploader_provider=? GROUP BY response_content_type";
$stmt=$conn->prepare($sql);
$stmt->bind_param('s',$provider);
$stmt->execute();
$res=$stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$result[]=$res;

echo json_encode($result);

?>  