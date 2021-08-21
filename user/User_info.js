$(function () {
  request=$.ajax({
    type:"GET",
    url:"User_info.php",
    dataType:"json"
  });
  request.done(function(response,TextStatus,jqXHR){
    let data=response;
    $("#last_upload_date").text(data[1]);
    $("#eggrafa").text(data[0]);
    $("#username_info").text(data[2]);
  });
});