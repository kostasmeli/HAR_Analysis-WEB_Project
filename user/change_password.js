$(function(){

  $("#password_change").on("submit",function(e){
    e.preventDefault();
    var old_password=$("#old_password").val();
    var new_password=$("#new_password").val();
    var new_password_repeat=$("#new_password_repeat").val();
    if(new_password===new_password_repeat){
      serializedData=$("#password_change").serialize();
      //console.log(serializedData);
      request=$.ajax({
        type:"POST",
        url:"Password_Change.php",
        data:serializedData
      });
      request.done(function(response,textStatus,jqXHR){
        if(response=="success"){
          console.log("Password Changed");
          string_alert='<div class="alert alert-success alert-dismissible fade show" role="alert">'+ '<strong>Success, </strong>Password Changed,Please log in again' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
          $("#alert_msg_password  ").empty().append(string_alert);
          setTimeout( function(){
          window.location.href = "Login_User.html";
          },5*1000);
        }
        else if(response=="error"){
          string_alert='<div class="alert alert-danger alert-dismissible fade show" role="alert">'+ '<strong>Error, </strong>Password is wrong' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
          $("#alert_msg_password").empty().append(string_alert);
        }
      });
      request.fail(function (jqXHR, textStatus, errorThrown){
        console.error(
           "The following error occurred: "+
           textStatus, errorThrown
        );
    });
  }
  else{
    string_alert='<div class="alert alert-danger alert-dismissible fade show" role="alert">'+ '<strong>Error, </strong>Password repeat is wrong' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    $("#alert_msg_password").empty().append(string_alert);
    $("#new_password").val("");
    $("#new_password_repeat").val("");
  }
  });
});