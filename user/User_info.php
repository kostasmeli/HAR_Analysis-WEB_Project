<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
session_start();
header('Content-Type: application/json');
$username=$_SESSION["username"];

$usersql="SELECT User_id FROM user WHERE username=? AND isAdmin=0";
$stmt = $conn->prepare($usersql); 
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result(); 
$user_array = $result->fetch_assoc(); 
$userid=$user_array["User_id"];

$sql="SELECT count(entry_id) as files_uploaded from harentries where uploader=? AND entry_id=0";
$stmt= $conn->prepare($sql);
$stmt->bind_param("i",$userid);
$stmt->execute();
$result= $stmt->get_result();
$result_arr=$result->fetch_assoc();
$js_array[]=$result_arr["files_uploaded"];

$sql_date="SELECT date_uploaded FROM harentries WHERE uploader=? ORDER BY date_uploaded DESC LIMIT 1";
$stmt= $conn->prepare($sql_date);
$stmt->bind_param("i",$userid);
$stmt->execute();
$result= $stmt->get_result();
$result_arr=$result->fetch_assoc();
$js_array[]=$result_arr["date_uploaded"];
$js_array[]=$username;

 $sql="SELECT filename,DATE(date_uploaded)as date_uploaded, max(entry_id)as entry_id from harentries where uploader=? group by filename ";
 $stmt=$conn->prepare($sql);
 $stmt->bind_param("i",$userid);
 $stmt->execute();
 $result= $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
 $js_array[]=$result;

echo json_encode($js_array);

?>