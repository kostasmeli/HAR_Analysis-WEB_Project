$(function (){
  request=$.ajax({
    type:"GET",
    url:"basic_info.php",
    dataType:"json"
  });
  request.done(function(response,textStatus,jqXHR){
    function countDuplicates(obj, num){
      obj[num] = (++obj[num] || 1);
      return obj;
    }
    var har_array=[];
    var length_array=response[0].length;
    var head=response[0];
    var methods_array=[];
    var status_array=[];
    var domains_array=[];
    var provider_array=[];
    var content_type_age_array=[];
    var number_users=response[1].user_numbers;
    

    for(i=0; i<length_array; i++){
      let temp= JSON.parse(head[i].har);
      har_array.push(temp);
      provider_array.push(temp.uploader.provider);
    }
    unique_providers=[... new Set(provider_array)];


    for(i=0; i<length_array; i++){
      let entries_length=har_array[i].entries_array.length;
      for(x=0; x<entries_length; x++){
        methods_array.push(har_array[i].entries_array[x].request.method);
        status_array.push(har_array[i].entries_array[x].response.status);
        domains_array.push(har_array[i].entries_array[x].request.url.toString());
        //αν το age δεν ειναι empty , τοτε πρόσθεσε το content-type και age 
        if(har_array[i].entries_array[x].response.headers["age"]!=="empty"){
          let temp_json={
            content_type:har_array[i].entries_array[x].response.headers["content-type"],
            age:parseInt(har_array[i].entries_array[x].response.headers["age"])
          };
          content_type_age_array.push(temp_json);
        }
      }
    }

    var result=[];
    content_type_age_array.reduce(function(res, value) {
      if (!res[value.content_type]) {
        res[value.content_type] = { name: value.content_type, age: 0 };
        result.push(res[value.content_type])
      }
      res[value.content_type].age += value.age;
      return res;
    }, {});

   // a nice way to remove duplicates
   // var filtered_methods_array=[... new Set(methods_array)];


   //a nice way to remove create a json with occurence of unique elements

    var content_type_array=$.map(content_type_age_array,function(o){return o.content_type;});
    var content_type_data=content_type_array.reduce(countDuplicates,{});

    var status_data=status_array.reduce(countDuplicates,{});
    var methods_data=methods_array.reduce(countDuplicates,{});
    var domains_data=[... new Set(domains_array)];

    var maxiter=result.length;
    for(i=0; i<maxiter; i++){
      tempname=result[i].name;
      let freq= Math.floor((result[i].age/content_type_data[tempname]));
      result[i]["frequency"]=freq;
    }
    console.log(content_type_data);
    console.log(result);

    $("#numberofusers").text(number_users);
    $("#uniqueproviders").text(unique_providers.length);
    $("#nuniquedomains").text(domains_data.length);
    for(let methods in methods_data){
     let string="<tr><th>"+methods+"</th>"+"<td>"+ methods_data[methods]+"</td></tr>"
     $("#1stbody").append(string);
    }

    for(let status in status_data){
      let string="<tr><th>"+status+"</th>"+"<td>"+ status_data[status]+"</td></tr>"
      $("#2ndbody").append(string);
    }
    for(i=0; i<maxiter; i++){
      let string="<tr><th>"+result[i].name+"</th>"+"<td>"+ result[i].frequency+"</td></tr>"
      $("#3rdbody").append(string);
    }

  })
});