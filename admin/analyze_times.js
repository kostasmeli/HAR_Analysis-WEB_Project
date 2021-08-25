$(function(){
  request=$.ajax({
    type:"GET",
    url:"analyze_time.php",
    dataType:"json"
  });
  request.done(function(response,textStatus,jqXHR){
    function countDuplicates(obj, num){
      obj[num] = (++obj[num] || 1);
      return obj;
    }
    var numberofhar=response.length;
    var har_array=[];
    for(i=0; i<numberofhar; i++){
      har_array.push(JSON.parse(response[i].har));
    }


    var array_content_hour_timing=[];
    numberofhars =har_array.length;


    for(i=0; i<numberofhars; i++){
      let entries_length=har_array[i].entries_array.length;
      for(x=0; x<entries_length; x++){
        let tempdate=new Date(har_array[i].entries_array[x].startedDateTime.replace("T"," ").replace("Z"," "))
        temp_value={
          content_type:har_array[i].entries_array[x].response.headers["content-type"],
          wait:har_array[i].entries_array[x].timings.wait,
          hour:tempdate.getHours()
        };
        array_content_hour_timing.push(temp_value);
      }
    }
    console.log(array_content_hour_timing);
    var time_array=$.map(array_content_hour_timing,function(o){return o.hour});
    var time_occur=time_array.reduce(countDuplicates,{});
    console.log(time_occur) //json with key=hour & value=occurrence 
    var result=[];
    array_content_hour_timing.reduce(function(res, value) {
      if (!res[value.hour]) {
        res[value.hour] = { hour: value.hour, wait: 0 };
        result.push(res[value.hour])
      }
      res[value.hour].wait += value.wait;
      return res;
    }, {});
    console.log(result)
    for(i=0; i<result.length; i++){
      result[i]["mean_wait"]=
    }
    var ctx = $('#myChart');

  });
});