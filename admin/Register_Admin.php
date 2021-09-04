<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');

$username= $_POST['username'];
$password= $_POST['password'];
$email=    $_POST['email'];

$param_password=password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO user (username, password,email,isAdmin) VALUES (?, ?, ?,True)";
$stmt=$conn->prepare($sql);
$stmt->bind_param("sss",$username,$param_password,$email);
if($stmt->execute()){
	echo"success";
	$stmt->close();
	exit;
}
else{
	echo"error";
	$stmt->close();
	exit;
}
?>