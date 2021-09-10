$(function () {
  $('#registration').on('submit', function (e) {
    e.preventDefault();
    serializedData=$('#registration').serialize();
    request= $.ajax({
      type: 'POST',
      url: 'Register_User.php',
      data: serializedData
    });
    request.done(function(response,textStatus,jqXHR){
      if(response=="success"){
        console.log("User Registered")
        string_alert='<div class="alert alert-success alert-dismissible fade show" role="alert">'+ '<strong>Registered Successfully,</strong>You will be redirected to the login page' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        $("#alert_msg").empty().append(string_alert);
        setTimeout(function(){
          window.location.href = "Login_User.html";
        },5*1000);
      }
      else if (response=="error"){
        string_alert='<div class="alert alert-danger alert-dismissible fade show" role="alert">'+ '<strong>Error</strong>, Username already exists' +'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
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