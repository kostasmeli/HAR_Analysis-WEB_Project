<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
$json = file_get_contents('php://input');
$data=json_decode($json,true);
session_start();
$username=$_SESSION["username"];

$maxiter=count($data["entries_array"]);


$usersql="SELECT User_id FROM user WHERE username=? AND isAdmin=0";
$stmt = $conn->prepare($usersql); 
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result(); 
$user_array = $result->fetch_assoc(); 
$userid=intval($user_array["User_id"]);

$sql="INSERT INTO harentries (uploader,uploader_lat_long,uploader_city,uploader_provider,startedDateTime,weekday,serverIpAddress,entry_id,wait,server_lat_long,status,status_text,method,url,request_content_type,request_cache_control,request_pragma,request_host,response_content_type,response_cache_control,response_pragma,response_expires,response_age,response_last_modified) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
$stmt=$conn->prepare($sql);
for ($i=0; $i<$maxiter; $i++){
  $uploader_lat_long=$data["uploader"]["geolocation"];
  $uploader_city=$data["uploader"]["city"];
  $uploader_provider=$data["uploader"]["provider"];
  $startedDateTime=$data["entries_array"][$i]["startedDateTime"];
  $weekday=$data["entries_array"][$i]["weekday"];
  $serverIpAddress=$data["entries_array"][$i]["serverIPAddress"];
  $entryid=$data["entries_array"][$i]["data_id"];
  $wait=intval($data["entries_array"][$i]["timings"]["wait"]);
  $server_lat_long=$data["entries_array"][$i]["server_gloc"];
  $status=$data["entries_array"][$i]["response"]["status"];
  $status_text=$data["entries_array"][$i]["response"]["statusText"];
  $method=$data["entries_array"][$i]["request"]["method"];
  $url=$data["entries_array"][$i]["request"]["url"];
  $request_content_type=$data["entries_array"][$i]["request"]["headers"]["content-type"];
  $request_cache_control=$data["entries_array"][$i]["request"]["headers"]["cache-control"];
  $request_pragma=$data["entries_array"][$i]["request"]["headers"]["pragma"];
  $request_host=$data["entries_array"][$i]["request"]["headers"]["host"];
  $response_content_type=$data["entries_array"][$i]["response"]["headers"]["content-type"];
  $response_cache_control=$data["entries_array"][$i]["response"]["headers"]["cache-control"];
  $response_pragma=$data["entries_array"][$i]["response"]["headers"]["pragma"];
  $response_expires=$data["entries_array"][$i]["response"]["headers"]["expires"];
  $response_age=intval($data["entries_array"][$i]["response"]["headers"]["age"]);
  $response_last_modified=$data["entries_array"][$i]["response"]["headers"]["last-modified"];

  $stmt->bind_param("issssssiisisssssssssssis",$userid,$uploader_lat_long,$uploader_city,$uploader_provider,$startedDateTime,$weekday,$serverIpAddress,$entryid,$wait,$server_lat_long,$status,$status_text,$method,$url,$request_content_type,$request_cache_control,$request_pragma,$request_host,$response_content_type,$response_cache_control,$response_pragma,$response_expires,$response_age,$response_last_modified);
  $stmt->execute();

}

echo "success";

?>