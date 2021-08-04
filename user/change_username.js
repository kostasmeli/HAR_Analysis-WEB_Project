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
          $("#error_msg_username").text("Επιτυχής αλλαγή Username");
          setTimeout( function(){$("#error_msg").text("");
          window.location.href = "Login_User.html";
          },5*1000);
      }
     else if(response=="error_username"){
      console.log("Username Exists");
      $("#error_msg_username").text("Το Username ήδη χρησιμοποιείται");
      setTimeout( function(){$("#error_msg").text("");
      },5*1000);
     }
     else if(response=="error"){
      console.log("Wrong Password");
      $("#error_msg_username").text("Λανθασμένος κωδικός πρόσβασης ");
      setTimeout( function(){$("#error_msg").text("");
      },5*1000);
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