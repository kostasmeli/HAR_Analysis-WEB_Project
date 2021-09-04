$(function (){
  request=$.ajax({
    type:"GET",
    url:"basic_info.php",
    dataType:"json"
  });
  request.done(function(response,textStatus,jqXHR){
    console.log(response)
    
    $("#numberofusers").text(response[0]);
    $("#uniqueproviders").text(response[4]);
    $("#nuniquedomains").text(response[3]);

    var maxiter_method=response[1].length;
    for(let i=0; i<maxiter_method; i++){
     let string="<tr><th>"+response[1][i].method+"</th>"+"<td>"+ response[1][i].count_method+"</td></tr>";
     $("#1stbody").append(string);
    }
    var maxiter_status=response[2].length;
    for(let i=0; i<maxiter_status; i++ ){
      let string="<tr><th>"+response[2][i].status+"</th>"+"<td>"+ response[2][i].count_status+"</td></tr>";
      $("#2ndbody").append(string);
    }
    var maxiter_content=response[5].length;
    for(let i=0; i<maxiter_content; i++){
      let string="<tr><th>"+response[5][i].response_content_type+"</th>"+"<td>"+ parseFloat(response[5][i].avg_age).toFixed(2)+"</td></tr>";
      $("#3rdbody").append(string);
    }
    
  })
});