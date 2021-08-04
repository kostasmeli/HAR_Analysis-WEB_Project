<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
session_start();
$new_username=$_POST['new_username'];
$password= $_POST['password'];

//βρες τον κωδικό του χρήστη
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

//κανε update το username  αν οι κωδικοί ταιριάζουν
$sql = "UPDATE user SET username= ? WHERE username= ? AND password= ?  AND isAdmin=0";  
  if($stmt = mysqli_prepare($conn, $sql)){ 
    mysqli_stmt_bind_param($stmt,"sss",$param_new_username,$param_old_username,$param_password);
    $param_new_username = $new_username;
    $param_old_username = $_SESSION["username"];
    $param_password = password_hash($password, PASSWORD_DEFAULT);
    if(password_verify($password,$current_password)){
        if(mysqli_stmt_execute($stmt)){
          unset($_SESSION["loggedin"],$_SESSION["username"]);
          echo"success";
          exit();
        } 
        else{
            echo "error_username";
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