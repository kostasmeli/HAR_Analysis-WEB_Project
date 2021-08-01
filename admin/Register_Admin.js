$(function () {

  $('#registration').on('submit', function (e) {
    e.preventDefault();
    serializedData=$('#registration').serialize();
    //console.log(serializedData);
    request= $.ajax({
      type:'POST',
      url:'Register_Admin.php',
      data: serializedData
     });
     request.done(function(response,textStatus,jqXHR){
       console.log("You Registered the Admin")
       console.log(response)
       
     });
     request.fail(function (jqXHR, textStatus, errorThrown){
      console.error(
          "The following error occurred: "+
          textStatus, errorThrown
      );
  });
  });
});