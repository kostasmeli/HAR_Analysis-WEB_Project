<?php
session_start();

unset($_SESSION["loggedin"],$_SESSION["username"]);
echo"session_user_killed";
exit;
?>