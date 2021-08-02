<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');

$username= $_POST['username'];
$password= $_POST['password'];
  

$sql = "SELECT  username,password FROM user WHERE username = ? AND isAdmin=1";
if($stmt_user = mysqli_prepare($conn,$sql)){
   mysqli_stmt_bind_param($stmt_user,"s",$param_username);
   $param_username = $username;
   if(mysqli_stmt_execute($stmt_user)){
   mysqli_stmt_store_result($stmt_user);
    if(mysqli_stmt_num_rows($stmt_user)== 1){
      mysqli_stmt_bind_result($stmt_user,$username,$hashed_password);
       if(mysqli_stmt_fetch($stmt_user)){
         if(password_verify($password,$hashed_password)){
          session_start();
          // Store data in session variables
            $_SESSION["admin_loggedin"] = true;
            $_SESSION["admin_username"] = $username;                             
            echo"success";
            exit;
          }
          else{
            echo"wrong_password"; 
            exit;                
          }                
        }            
      }      
     else{
      echo"wrong_username"; 
      exit;          
     }     
  }    
  mysqli_stmt_close($stmt_user);
}    

mysqli_close($conn);

?>

