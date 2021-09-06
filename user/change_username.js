$(function(){

  $("#username_change").on("submit",function(e){
    e.preventDefault();
    serializedData=$("#username_change").serialize();
    console.log(serializedData);
    request=$.ajax({
      type:"POST",
      url:"Username_Change.php",
      data:serializedData
    });
    request.done(function(response,textStatus,jqXHR){
      if(response=="success"){
        console.log("Username Changed");
        string_alert='<div class="alert alert-success alert-dismissible fade show" role="alert">'+ '<strong>Success,</strong>Username Changed,Please log in again' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        $("#alert_msg_username").empty().append(string_alert);
          setTimeout( function(){
          window.location.href = "Login_User.html";
          },5*1000);
      }
     else if(response=="error_username"){
      console.log("Username Exists");
      string_alert='<div class="alert alert-danger alert-dismissible fade show" role="alert">'+ '<strong>Error, d</strong>Username is already being used' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
      $("#alert_msg_username").empty().append(string_alert);
  
     }
     else if(response=="error"){
      console.log("Wrong Password");
      string_alert='<div class="alert alert-danger alert-dismissible fade show" role="alert">'+ '<strong>Error, d</strong>Password is incorrect' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
      $("#alert_msg_username").empty().append(string_alert);
     }
     else{
      console.log(response)
    }
    });
    request.fail(function(jqXHR,textStatus,errorThrown){
      console.error(
        "The following error occurred: "+
        textStatus, errorThrown
     );
    });
  });
});