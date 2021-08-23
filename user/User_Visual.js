$(function () {
  request=$.ajax({
    type:"GET",
    url:"User_visual.php",
    dataType:"json"
  });

  request.done(function(response,TextStatus,jqXHR){
    var har_array=[];
    for (i=0; i<response.length; i++){
      har_array[i]=JSON.parse(response[i].har);
    }
    var infoloc=[];

    for (let x=0; x<har_array.length; x++){
      for(let i=0; i<har_array[x].entries_array.length; i++){
        let array = har_array[x].entries_array[i].server_gloc.split(',');
        let temp={
          lat:parseFloat(array[0]),
          lng:parseFloat(array[1]),
        }
        infoloc.push(temp);
      }
    }
    //console.log(infoloc);


    var testData = {
      max: 15,
      data:infoloc
    };
    var baseLayer=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoia3dzdGFzbWVsIiwiYSI6ImNrcnoydGhoNDBuamUybm85MmhnaHJlcTQifQ.mFbkt4WVCUKo3hLpKbZqOA'
  });
  var cfg = {
    "radius": 20,
    "maxOpacity": 0.8,
    "scaleRadius": false,
    "useLocalExtrema": false,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
  };
  let heatmapLayer= new HeatmapOverlay(cfg);

  var map=new L.Map('mapid',{
   center: new L.LatLng(38.246639, 21.734573),
   zoom:4,
   layers:[baseLayer,heatmapLayer]
  });

  heatmapLayer.setData(testData);
  })

  
});