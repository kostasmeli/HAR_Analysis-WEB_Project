sessioncheck=$.ajax({
  type:"GET",
  url:"session_user_check.php",
});
sessioncheck.done(function(response,textStatus,jqXHR){
  if(response=="error"){
    window.location.href="/index.html";
  }
});