<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
session_start();
$old_password=$_POST['old_password'];
$new_password= $_POST['new_password'];

$sql = "SELECT password FROM user WHERE username = ?  AND isAdmin=0";
if($stmt_user = mysqli_prepare($conn,$sql)){
   mysqli_stmt_bind_param($stmt_user,"s",$param_username);
   $param_username = $_SESSION["username"];
   if(mysqli_stmt_execute($stmt_user)){
   mysqli_stmt_store_result($stmt_user);
    if(mysqli_stmt_num_rows($stmt_user)== 1){
      mysqli_stmt_bind_result($stmt_user,$hashed_password);
       if(mysqli_stmt_fetch($stmt_user)){
          $current_password=$hashed_password;
        }            
      }          
  }    
  mysqli_stmt_close($stmt_user);
}    


$sql = "UPDATE user SET password = ? WHERE username= ? AND password= ?";  
  if($stmt = mysqli_prepare($conn, $sql)){ 
    mysqli_stmt_bind_param($stmt, "sss", $param_password, $param_name,$param_old_password);
    $param_password = password_hash($new_password, PASSWORD_DEFAULT);
    $param_name = $_SESSION["username"];
    $param_old_password= $current_password;
    if(password_verify($old_password,$param_old_password)){
        if(mysqli_stmt_execute($stmt)){
          unset($_SESSION["loggedin"],$_SESSION["username"]);
          echo"success";
          exit();
        } else{
            echo "Oops! Something went wrong. Please try again later.";
            exit();
        }
    }
    else{
      echo"error";
      exit();
    }
    mysqli_stmt_close($stmt);
  }
mysqli_close($conn);
?>