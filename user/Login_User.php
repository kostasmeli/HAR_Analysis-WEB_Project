<?php
$username= $_POST['username'];
$password= $_POST['password'];

define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');



$sql = "SELECT  username,password FROM user WHERE username = ? AND isAdmin=0";
$stmt=$conn->prepare($sql);
$stmt->bind_param("s",$username);
$stmt->execute();
$res=$stmt->get_result()->fetch_assoc();
if(!empty($res["username"])){
  if(password_verify($password,$res["password"])){
    session_start();
    $_SESSION["loggedin"] = true;
    $_SESSION["username"] = $username;
    echo "success";
    exit;
  }
  else{
    echo"wrong_password";
    exit;
  }
}
else{
  echo"wrong_username";
  exit;
}

?>

