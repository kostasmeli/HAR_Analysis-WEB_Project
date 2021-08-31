$(function(){
  request=$.ajax({
    type:"GET",
    url:"Admin_visual.php",
    dataType:"json"
  });
  request.done(function(response,TextStatus,jqXHR){
    console.log(response);
    var users=$.map(response[0],function(o){return {user:o.username, location:o.uploader_lat_long, city:o.uploader_city}});
    console.log(users);
    maxiter=response[0].length;
    for(i=0; i<maxiter; i++){
      let user_loc=response[0][i].loc.split(",");
      let uploader_loc=response[0][i].uploader_lat_long.split(",");
      let user_loc_array=[parseFloat(user_loc[0]),parseFloat(user_loc[1])];
      let uploader_loc_array=[parseFloat(uploader_loc[0]),parseFloat(uploader_loc[1])];
      var usermarker = new L.Marker(user_loc_array).addTo(map);
      var polyline = new L.polyline([uploader_loc_array,user_loc_array]);
    }
      var loc_array=$.map(response[0],function(o){
        let temp_user=o.loc.split(",");
        let temp_uploader=o.uploader_lat_long.split(",");
        let temp_array=[parseFloat(temp_user[0]),parseFloat(temp_user[1])];
        let temp_array_uploader=[parseFloat(temp_uploader[0]),parseFloat(temp_uploader[1])];
        var polyline= new L.polyline([temp_array_uploader,temp_array]
          //,{weight:(o.count/80)}
          ).addTo(map)
        var marker =new L.Marker(temp_array).addTo(map);
        var marker_uploader = new L.marker(temp_array_uploader).addTo(map).bindPopup(o.username +" from "+ o.uploader_city);
        });
        
    
  })
  var baseLayer=L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia3dzdGFzbWVsIiwiYSI6ImNrcnoydGhoNDBuamUybm85MmhnaHJlcTQifQ.mFbkt4WVCUKo3hLpKbZqOA'
  });

  var map=new L.Map('mapid',{
    center: new L.LatLng(38.246639, 21.734573),
    zoom:4,
    layers:[baseLayer]
  });


})