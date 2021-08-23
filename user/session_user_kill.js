$(function () {
  
  $("#logout_btn").on('click',function(e){
    sessionkill=$.ajax({
                  type:'GET',
                  url:'session_user_kill.php',
                });
    sessionkill.done(function(response,textStatus,jqXHR){
      if(response=="session_user_killed"){
        window.location.href = "/index.html";
      }
    }); 
  });
});