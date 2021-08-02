<?php
session_start();

unset($_SESSION["admin_loggedin"],$_SESSION["admin_username"]);
echo"session_admin_killed";
exit;
?>