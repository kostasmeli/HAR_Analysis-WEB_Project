<?php
session_start();
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: UserFiles/Welcome.php");
    exit;
}
if(isset($_SESSION["admin_loggedin"]) && $_SESSION["admin_loggedin"] === true){
    //header("location:Admin\WelcomeAdmin.php");
    //exit;
}
?>