<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
session_start();
header('Content-Type: application/json');
$username=$_SESSION["username"];
/*
//Retrieve userid from username
$username="kwstas13";
$usersql="SELECT User_id FROM user WHERE username=? AND isAdmin=0";
$stmt = $conn->prepare($usersql); 
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result(); 
$user_array = $result->fetch_assoc(); 
$userid=$user_array["User_id"];
*/
$sql="SELECT COUNT(uploaderid) FROM files inner join user on files.uploaderid=user.User_id WHERE username =? ";
$stmt= $conn->prepare($sql);
$stmt->bind_param("s",$username);
$stmt->execute();
$result= $stmt->get_result();
$result_arr=$result->fetch_assoc();
$js_array[]=$result_arr["COUNT(uploaderid)"];

$sql_date="SELECT dateupload FROM files inner join user on files.uploaderid=user.User_id WHERE username=? ORDER BY dateupload DESC LIMIT 1";
$stmt= $conn->prepare($sql_date);
$stmt->bind_param("s",$username);
$stmt->execute();
$result= $stmt->get_result();
$result_arr=$result->fetch_assoc();
$js_array[]=$result_arr["dateupload"];
$js_array[]=$username;
echo json_encode($js_array);

?>