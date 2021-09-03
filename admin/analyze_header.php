<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
header('Content-Type: application/json');

$result=[];
$sql="SELECT response_content_type,response_cache_control,response_expires,response_last_modified FROM harentries GROUP BY response_content_type,response_cache_control";
?>