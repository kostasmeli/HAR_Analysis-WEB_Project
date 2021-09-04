<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
session_start();
$old_password=$_POST['old_password'];
$new_password= $_POST['new_password'];
$username=$_SESSION["username"];
//βρες τον κωδικό του χρήστη
$sql = "SELECT password FROM user WHERE username = ?  AND isAdmin=0";
$stmt=$conn->prepare($sql);
$stmt->bind_param("s",$username);
$stmt->execute();
$res=$stmt->get_result()->fetch_assoc();
$hashed_password=$res["password"];
$stmt->close();


 

if(password_verify($old_password,$hashed_password)){
  $sql = "UPDATE user SET password = ? WHERE username= ? AND password= ? AND isAdmin=0";  
  $param_password = password_hash($new_password, PASSWORD_DEFAULT);
  $stmt=$conn->prepare($sql);
  $stmt->bind_param("sss",$param_password,$username,$hashed_password);
  if($stmt->execute()){
    unset($_SESSION["loggedin"],$_SESSION["username"]);
    echo"success";
    exit();
  }
  else{
    echo "user_error";
    exit();
  }
}
else{
  mysqli_close($conn);
  echo"error";
  exit();
}

?>