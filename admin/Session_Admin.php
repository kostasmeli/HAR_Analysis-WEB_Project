<?php
session_start();
if(isset($_SESSION["admin_loggedin"]) && $_SESSION["admin_loggedin"] === true){
    echo"session_admin_true";
    exit;
}
?>