$(function(){
  request=$.ajax({
    type:"GET",
    url:"analyze_header.php",
    dataType:"json"
  });
  request.done(function(response,textStatus,jqXHR){
    
  })
})