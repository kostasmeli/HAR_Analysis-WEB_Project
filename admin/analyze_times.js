$(function(){
  request=$.ajax({
    type:"GET",
    url:"analyze_time.php",
    dataType:"json"
  });
  request.done(function(response,textStatus,jqXHR){
    
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
  var ctx=$("#myChart");
  var mychart=new Chart(ctx,{
    type:"bar",
    data: {
      labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      datasets: [{
          label: 'Όλα τα είδη ιστοαντικειμένου',
          data:response[0] ,
          parsing: {
            xAxisKey: 'hour',
            yAxisKey: 'avgwait'
        },
          borderWidth: 1
      }],
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
  var get=$.map(response[2],function(o){
    if(o.method==="GET"){
      return{avgwait:o.avgwait,hour:o.hour}
    }
  })
  var post=$.map(response[2],function(o){
    if(o.method==="POST"){
      return{avgwait:o.avgwait,hour:o.hour}
    }
  })
  var ctx3=$("#myChart3");
  var mychart3=new Chart(ctx3,{
    type:"bar",
    data: {
      labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      datasets: [{
          label: 'POST',
          data:post ,
          parsing: {
            xAxisKey: 'hour',
            yAxisKey: 'avgwait'
        },
          borderColor:'rgba(233, 62, 62, 0.2)',
          backgroundColor:'rgba(233, 62, 62, 0.2)',
          borderWidth: 1
      },{
        label: 'GET',
        data:get ,
        parsing: {
          xAxisKey: 'hour',
          yAxisKey: 'avgwait'
      },
        borderColor:'rgba(62, 233, 90, 0.2)',
        backgroundColor:'rgba(62, 233, 90, 0.2)',
        borderWidth: 1
    }
    ],
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
  var cosmote= $.map(response[3],function(o){
    if(o.uploader_provider==="Greece - OTEnet"){
      return {avgwait:o.avgwait,hour:o.hour}
    }
  })
  var ctx4=$("#myChart4");
  var mychart4=new Chart(ctx4,{
    type:"bar",
    data: {
      labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      datasets: [{
          label: 'Cosmote',
          data:cosmote ,
          parsing: {
            xAxisKey: 'hour',
            yAxisKey: 'avgwait'
        },
          borderColor:'rgba(62, 165, 233, 0.2)',
          backgroundColor:'rgba(62, 165, 233, 0.2)',
          borderWidth: 1
      }
    ],
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