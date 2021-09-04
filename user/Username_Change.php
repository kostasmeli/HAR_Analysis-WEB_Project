<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
session_start();
$new_username=$_POST['new_username'];
$password= $_POST['password'];
$username=$_SESSION["username"];

//βρες τον κωδικό του χρήστη
$sql = "SELECT password FROM user WHERE username = ?  AND isAdmin=0";
$stmt=$conn->prepare($sql);
$stmt->bind_param("s",$username);
$stmt->execute();
$res=$stmt->get_result()->fetch_assoc();
$hashed_password=$res["password"];
$stmt->close();

//κανε update το username  αν οι κωδικοί ταιριάζουν
if(password_verify($password,$hashed_password)){
  $sql = "UPDATE user SET username= ? WHERE username= ? AND password= ?  AND isAdmin=0";  
  $stmt=$conn->prepare($sql);
  $stmt->bind_param("sss",$new_username,$username,$hashed_password);
  if($stmt->execute()){
    unset($_SESSION["loggedin"],$_SESSION["username"]);
    echo"success";
    $stmt->close();
    exit();
  }
  else{
    $stmt->close();
    echo "error_username";
    exit();
  }
}
else{
  echo"error";
  exit();
}
  
?>