$(function(){
  request1=$.ajax({
    type:"GET",
    url:"test.php",
    dataType:'json'
  });
  request1.done(function(response,textStatus,jqXHR){
    var data=response[0];
    console.log(data);
    var groupkoumpakia=$("#koumpakia");
    for (let i=0; i<response[0].length; i++){
      let buttonstring=$('<input/>').attr({
        class:"btn btn-primary",
        type: "submit",
        id: "button"+ response[0][i].providers,
        value: response[0][i].providers
    });
    groupkoumpakia.append(buttonstring);
    }
  });
  $('#koumpakia').on('click', 'input', function(e) {
    var name = this.value
    request=$.ajax({
      type:"POST",
      url:"analyze_header.php",
      data:{provider:name},
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
      console.log(response[1]);
      maxiter=response[0].length;
      for(i=0; i<maxiter; i++){
        let tempjson=response[0][i];
        array_cache_control=tempjson.response_cache_control.split(",");
        if(array_cache_control.includes("public")){
          response[0][i].response_cache_control="public";
        }
        else if(array_cache_control.includes("private")){
          response[0][i].response_cache_control="private";
        }
        else if(array_cache_control.includes("no-cache")){
          response[0][i].response_cache_control="no-cache";
        }
        else if(array_cache_control.includes("no-store")){
          response[0][i].response_cache_control="no-cache";
        }
        else{
          response[0][i].response_cache_control="not-found";
        }
      }
       var cachetemp=response[0].filter(element=>element.response_cache_control!=="not-found");
       
      //μετράω πόσες φορές υπάρχει το κάθε content-type/cache-control πως ακριβως???
      const m = new Map();
      cachetemp.forEach(({response_content_type, response_cache_control}) => {
    // Create a key with values that we want to group by
    // A list of key-value pairs is chosen to make use of `Object.fromEntries` later
    const hash = JSON.stringify([['response_content_type', response_content_type], ['response_cache_control', response_cache_control]]);
    m.set(hash, (m.get(hash) || 0) + 1);
  });
    const dedup = [...m].map(([rec, count]) => ({
    ...Object.fromEntries(JSON.parse(rec)),
    count,
  }))
      console.log(dedup)
  
      data=[];
      var array_content_type=$.map(dedup,function(o){return o.response_content_type});
      var unique_content_type=[... new Set(array_content_type)];
      console.log(unique_content_type)
      for(i=0; i<unique_content_type.length; i++){
        let index=response[1].findIndex(element=>element.response_content_type===unique_content_type[i])
        let max_count=response[1][index].count;
        color=getRandomRgb();
        data[i]={
          label:unique_content_type[i],
          hidden:true,
          data:[],
          parsing:{
            xAxisKey:"cache_type",
            yAxisKey:"count"
          },
          borderColor:color,
          backgroundColor:color,
          borderWidth:1
        }
        for(let x=0; x<dedup.length; x++){
          if(unique_content_type[i]===dedup[x].response_content_type){
            let temp={cache_type:dedup[x].response_cache_control,count:(dedup[x].count/max_count)*100};
            data[i].data.push(temp);
          }
        }
      }
      let chartStatus = Chart.getChart("myChart");
      if (chartStatus != undefined) {
        chartStatus.destroy();
      }
      var ctx=$("#myChart");
      var myChart=new Chart(ctx,{
        type:"bar",
        data:{
          labels:["public","private","no-cache","no-store"],
          datasets:data
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
              text:'Ποσοστό (%) cacheability directives επί του συνόλου των αποκρίσεων ανά CONTENT-TYPE '
            }
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          }
        }
      });
      
    })
  
  });
  

})