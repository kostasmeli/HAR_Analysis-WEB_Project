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
    console.log(data);
    for(i=0; i<data[3].length; i++){
      let string="<tr><th>"+data[3][i].filename+"</th>"+"<td>"+ data[3][i].date_uploaded+"</td></tr>";
     $("#files").append(string);
    }
  });
});