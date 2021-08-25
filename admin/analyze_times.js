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
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var numberofhar=response.length;
    var har_array=[];
    for(i=0; i<numberofhar; i++){
      har_array.push(JSON.parse(response[i].har));
    }


    var array_content_hour_timing=[];
    var array_day_hour_wait=[];
    numberofhars =har_array.length;


    for(i=0; i<numberofhars; i++){
      let entries_length=har_array[i].entries_array.length;
      for(x=0; x<entries_length; x++){
        let tempdate=new Date(har_array[i].entries_array[x].startedDateTime.replace("T"," ").replace("Z"," "))
        temp_value_a={
          content_type:har_array[i].entries_array[x].response.headers["content-type"],
          wait:har_array[i].entries_array[x].timings.wait,
          hour:tempdate.getHours()
        };
        temp_value_b={ 
          day:weekday[tempdate.getDay()],
          wait:har_array[i].entries_array[x].timings.wait,
          hour:tempdate.getHours()
        }
        array_content_hour_timing.push(temp_value_a);
        array_day_hour_wait.push(temp_value_b);
      }
    }
    console.log(array_day_hour_wait);
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
      result[i]["mean_wait"]=Math.floor((result[i].wait/time_occur[result[i].hour]));
    }

    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
          datasets: [{
              label: 'όλες οι αιτήσεις',
              data: result,
              parsing: {
                xAxisKey: 'hour',
                yAxisKey: 'mean_wait'
            },
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio:false,
          plugins:{
            legend:{
              position:'top',
            },
            title:{
              display:true,
              text:'Μέσο χρόνο απόκρισης σε κάθε αίτηση ανά ώρα της ημέρας'
            }
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  });
});