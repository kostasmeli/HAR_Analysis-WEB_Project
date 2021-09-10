$(function () {
  sessioncheck=$.ajax({
    type:'GET',
    url:'Session_User.php',
  });
  sessioncheck.done(function(response,textStatus,jqXHR){
    if(response=="session_user_true"){
      window.location.href = "User_Index.html";
    }
  }); 
  $('#login').on('submit', function (e) {
    e.preventDefault();
    serializedData=$('#login').serialize();
    request=$.ajax({
      type: 'POST',
      url: 'Login_User.php',
      data: serializedData
    });
    request.done(function(response,TextStatus,jqXHR){
      if(response=="success"){
        console.log("user logged in");
        string_alert='<div class="alert alert-success alert-dismissible fade show" role="alert">'+ '<strong>Logged in, </strong>You will be redirected to the start page' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        $("#alert_msg").empty().append(string_alert);
        setTimeout(function(){
          window.location.href = "User_Index.html";
         },5*1000);
      }
      else if (response=="wrong_password"){
        string_alert='<div class="alert alert-danger alert-dismissible fade show" role="alert">'+ '<strong>Wrong Password</strong>, Please try again' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        $("#alert_msg").empty().append(string_alert);

        $("#password").val("");
       }
      else if(response=="wrong_username"){
        string_alert='<div class="alert alert-danger alert-dismissible fade show" role="alert">'+ '<strong>Wrong Username</strong>, Please try again' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        $("#alert_msg").empty().append(string_alert);
        
       }
      else console.log(response)
    });
    request.fail(function (jqXHR, textStatus, errorThrown){
      console.error(
          "The following error occurred: "+
          textStatus, errorThrown
      );
  });
  });
});