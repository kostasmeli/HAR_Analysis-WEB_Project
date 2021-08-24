<?php 
session_start();
if(
 (!isset($_SESSION["admin_loggedin"]) || $_SESSION["admin_loggedin"] !== true)
)
{
    echo"error";
    exit;
}
?>