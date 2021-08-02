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
        $("#error_msg").text("Registered Successfully,You will be redirected to the login page")
        setTimeout(function(){
          $("#error_msg").text("");
          window.location.href = "Login_User.html";
        },5*1000);
      }
      else if (response=="error"){
       $("#error_msg").text("Username already exists");
       setTimeout( function(){$("#error_msg").text("")},5*1000);
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