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
          $("#error_msg").text("Επιτυχής αλλαγή κωδικού πρόσβασης");
          setTimeout( function(){$("#error_msg").text("");
          window.location.href = "Login_User.html";
          },5*1000);
        }
        else if(response=="error"){
          $("#error_msg").text("Λάθος υπάρχον κωδικός");
          setTimeout( function(){$("#error_msg").text("")},5*1000);
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
    $("#error_msg").text("Λάθος επανάληψη νέου κωδικού");
    setTimeout( function(){$("#error_msg").text("")},5*1000);
    $("#new_password").val("");
    $("#new_password_repeat").val("");
  }
  });
});