<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');

$username= $_POST['username'];
$password= $_POST['password'];
$email=    $_POST['email'];
echo $email,"\n";
echo $password,"\n";
echo $username,"\n";

$sql = "INSERT INTO user (username, password,email,isAdmin) VALUES (?, ?, ?,True)";
if($stmt = mysqli_prepare($conn, $sql)){
 // κάνει bind τις τιμές στο statement
 $param_username=$username;
 $param_password=password_hash($password, PASSWORD_DEFAULT);
 $param_email=$email;
 mysqli_stmt_bind_param($stmt, 'sss', $param_username,$param_password,$param_email);
 if(mysqli_stmt_execute($stmt)){
   echo"Added";
	}
	else{
	echo"something went wrong";
	}
	mysqli_stmt_close($stmt);
}

mysqli_close($conn);

?>