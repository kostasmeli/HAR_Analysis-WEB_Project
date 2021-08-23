$(function () {
  sessioncheck=$.ajax({
    type:'GET',
    url:'Session_Admin.php',
  });
  sessioncheck.done(function(response,textStatus,jqXHR){
    if(response=="session_admin_true"){
      window.location.href = "Admin_Index.html";
    }
  }); 
  $('#login').on('submit', function (e) {
    e.preventDefault();
    serializedData=$('#login').serialize();
    //console.log(serializedData);
    request= $.ajax({
      type:'POST',
      url:'Login_Admin.php',
      data: serializedData
     });
     request.done(function(response,textStatus,jqXHR){
      if(response=="success"){
       console.log("Admin Logged In")
       $("#error_msg").text("Logged in,You will be redirected to the start page")
       setTimeout(function(){
         $("#error_msg").text("");
         window.location.href = "Admin_Index.html";
        },5*1000);
      }
      else if (response=="wrong_password"){
       $("#error_msg").text("Wrong Password, Try again");
       setTimeout( function(){$("#error_msg").text("")},5*1000);
       $("#password").val("");
      }
      else if(response=="wrong_username"){
       $("#error_msg").text("Wrong Username, Try again");
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