<?php
define('__ROOT__', dirname(dirname(__FILE__)));
require_once(__ROOT__.'/config.php');
$data=$_POST["har"];
//echo $data;
//TODO QUERY TO GET THE USERID FROM SESSION NAME 
$sql = "INSERT INTO files (uploaderid,har) VALUES (4,?)";
if ($stmt=mysqli_prepare($conn,$sql)){
  $param_json=$data;
  mysqli_stmt_bind_param($stmt,'s',$param_json);
  if(mysqli_stmt_execute($stmt)){
    echo"success";
  }
  else{
    //echo"error";
    printf("Error: %s.\n", mysqli_stmt_error($stmt));

  }
  mysqli_stmt_close($stmt);
  mysqli_close($conn);
  exit;
}
else{
  echo"connection error";
}
?>