<?
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');
session_start();
?>