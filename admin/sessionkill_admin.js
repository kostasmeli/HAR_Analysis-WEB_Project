$(function () {
  
  $("#logout_btn").on('click',function(e){
    sessionkill=$.ajax({
                  type:'GET',
                  url:'session_admin_kill.php',
                });
    sessionkill.done(function(response,textStatus,jqXHR){
      if(response=="session_admin_killed"){
        window.location.href = "/index.html";
      }
    }); 
  });
});