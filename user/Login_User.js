$(function () {
  /*$.ajax({
    type:'GET',
    url:'SessionCheck.php',
    success:function(){
      
    }
  }); */
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
        $("#error_msg").text("Logged in,You will be redirected to the start page")
        setTimeout(function(){
          $("#error_msg").text("");
          window.location.href = "User_Index.html";
         },5*1000);
      }
      else if (response=="wrong_password"){
        $("#error_msg").text("Wrong Password, Try again");
        setTimeout( function(){$("#error_msg").text("")},5*1000);
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