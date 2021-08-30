$(function(){
  request=$.ajax({
    type:"GET",
    url:"analyze_time.php",
    dataType:"json"
  });
  request.done(function(response,textStatus,jqXHR){
    function getRandomRgb() {
      var num = Math.round(0xffffff * Math.random());
      var r = num >> 16;
      var g = num >> 8 & 255;
      var b = num & 255;
      var a = 0.2;
      return 'rgba(' + r + ', ' + g + ', ' + b + ',' + a + ')';
    }
    console.log(response);
    var monday= $.map(response[1],function(o){
      if (o.weekday==="Monday")
      {return {avgwait:o.avgwait,hour:o.hour}
    }
    })
    var tuesday=$.map(response[1],function(o){
      if(o.weekday==="Tuesday"){
        return{avgwait:o.avgwait,hour:o.hour}
      }
    })
    var wednesday=$.map(response[1],function(o){
      if(o.weekday==="Wednesday"){
        return{avgwait:o.avgwait,hour:o.hour}
      }
    })
    var thursday=$.map(response[1],function(o){
      if(o.weekday==="Thursday"){
        return{avgwait:o.avgwait,hour:o.hour}
      }
    })
    var friday=$.map(response[1],function(o){
      if(o.weekday==="Friday"){
        return{avgwait:o.avgwait,hour:o.hour}
      }
    })
    var saturday=$.map(response[1],function(o){
      if(o.weekday==="Saturday"){
        return{avgwait:o.avgwait,hour:o.hour}
      }
    })
    var sunday=$.map(response[1],function(o){
      if(o.weekday==="Sunday"){
        return{avgwait:o.avgwait,hour:o.hour}
      }
    })

    var ctx2 = $('#myChart2');
    var myChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
          labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
          datasets: [
          {
            label:"Δευτέρα",
            data:monday,
            parsing:{
              xAxisKey: "hour",
              yAxisKey: "avgwait"
            },
            borderColor:'rgba(233, 62, 62, 0.2)',
            backgroundColor:'rgba(233, 62, 62, 0.2)',
            borderWidth:1
          },{
            label:"Τρίτη",
            data:tuesday,
            parsing:{
              xAxisKey: "hour",
              yAxisKey: "avgwait"
            },
            borderColor:'rgba(62, 233, 90, 0.2)',
            backgroundColor:'rgba(62, 233, 90, 0.2)',
            borderWidth:1
          },
          {
            label:"Τεταρτη",
            data:wednesday,
            parsing:{
              xAxisKey: "hour",
              yAxisKey: "avgwait"
            },
            borderColor:'rgba(62, 165, 233, 0.2)',
            backgroundColor:'rgba(62, 165, 233, 0.2)',
            borderWidth:1
          },
          {
            label:"Πέμπτη",
            data:thursday,
            parsing:{
              xAxisKey: "hour",
              yAxisKey: "avgwait"
            },
            borderColor:'rgba(233, 130, 62, 0.2)',
            backgroundColor:'rgba(233, 130, 62, 0.2)',
            borderWidth:1
          },
          {
            label:"Παρασκευή",
            data:friday,
            parsing:{
              xAxisKey: "hour",
              yAxisKey: "avgwait"
            },
            borderColor:'rgba(232, 222, 118, 0.2)',
            backgroundColor:'rgba(232, 222, 118, 0.2)',
            borderWidth:1
          },
          {
            label:"Σαββατο",
            data:saturday,
            parsing:{
              xAxisKey: "hour",
              yAxisKey: "avgwait"
            },
            borderColor:'rgba(214, 118, 233, 0.2)',
            backgroundColor:'rgba(214, 118, 233, 0.2)',
            borderWidth:1
          },
          {
            label:"Κυριακή",
            data:sunday,
            parsing:{
              xAxisKey: "hour",
              yAxisKey: "avgwait"
            },
            borderColor:'rgba(116, 79, 16, 0.2)',
            backgroundColor:'rgba(116, 79, 16, 0.2)',
            borderWidth:1
          }
        ]
      }
      ,
      options: {
          responsive: true,
          maintainAspectRatio:false,
          plugins:{
            legend:{
              position:'top',
            },
            title:{
              display:true,
              text:'Μέσο χρόνο απόκρισης  ανά ώρα της ημέρας(b)'
            }
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  var result_content=[];
  var array_content=$.map(response[0],function(o){return o.response_content_type});
  var unique_content=[... new Set(array_content)];
  var maxitercontent=unique_content.length;
  var response0_length=response[0].length;
  for(let i=0; i<maxitercontent; i++){
    color=getRandomRgb();
    temp_content=unique_content[i];
    result_content[i]={
      label:temp_content,
      hidden:true,
      data:[],
      parsing:{
        xAxisKey:"hour",
        yAxisKey:"avgwait"
      },
      borderColor:color,
      backgroundColor:color,
      borderWidth:1
    }
    for(let x=0; x<response0_length; x++){
      if(temp_content===response[0][x].response_content_type){
        let temp_avgwait_hour={ avgwait:response[0][x].avgwait,hour:response[0][x].hour};
        result_content[i].data.push(temp_avgwait_hour);
      }
    }
  }
  console.log(result_content)
  var ctx=$("#myChart");
  var mychart=new Chart(ctx,{
    type:"bar",
    data: {
      labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      datasets:result_content
  },
  options: {
    responsive: true,
    maintainAspectRatio:false,
    plugins:{
      legend:{
        position:'top'
      },
      title:{
        display:true,
        text:'Μέσο χρόνο απόκρισης  ανά ώρα της ημέρας(a)'
      }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
  }
  });
  //
  var result_meth=[];
  var array_methods=$.map(response[2],function(o){return o.method});
  var unique_methods= [... new Set(array_methods)];
  var maxitermeth=unique_methods.length;
  var response2_length=response[2].length;
  for(let i=0; i<maxitermeth; i++){
    color=getRandomRgb();
    temp_meth=unique_methods[i];
    result_meth[i]={
      label:temp_meth,
      data:[],
      parsing:{
        xAxisKey:"hour",
        yAxisKey:"avgwait"
      },
      borderColor: color,
      backgroundColor: color,
      borderWidth:1
    }
    for(let x=0; x<response2_length; x++){
      if(temp_meth===response[2][x].method){
        let temp_avgwait_hour={avgwait:response[2][x].avgwait,hour:response[2][x].hour};
        result_meth[i].data.push(temp_avgwait_hour);
      }
    }
  }
  //
  console.log(result_meth);

  var ctx3=$("#myChart3");
  var mychart3=new Chart(ctx3,{
    type:"bar",
    data: {
      labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      datasets:result_meth,
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
        text:'Μέσο χρόνο απόκρισης  ανά ώρα της ημέρας(c)'
      }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
  }
  });
  console.log(response[3]);
  var result_prov=[];
  var array_prov=$.map(response[3],function(o){return o.uploader_provider});
  var unique_prov=[... new Set(array_prov)];
  var maxiterprov=unique_prov.length;
  var response3_length=response[3].length;
  for(let i=0; i<maxiterprov; i++){
    color=getRandomRgb();
    temp_prov=unique_prov[i];
    result_prov[i]={
      label:temp_prov,
      data:[],
      parsing:{
        xAxisKey:"hour",
        yAxisKey:"avgwait"
      },
      borderColor: color,
      backgroundColor: color,
      borderWidth:1
    }
    for(let x=0; x<response3_length; x++){
      if(temp_prov===response[3][x].uploader_provider){
        let temp_avgwait_hour={avgwait:response[3][x].avgwait,hour:response[3][x].hour};
        result_prov[i].data.push(temp_avgwait_hour);
      }
    }
  }

  var ctx4=$("#myChart4");
  var mychart4=new Chart(ctx4,{
    type:"bar",
    data: {
      labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      datasets: result_prov
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
        text:'Μέσο χρόνο απόκρισης  ανά ώρα της ημέρας(d)'
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