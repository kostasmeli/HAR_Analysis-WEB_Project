$(function(){
  request=$.ajax({
    type:"GET",
    url:"Admin_visual.php",
    dataType:"json"
  });
  var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  request.done(function(response,TextStatus,jqXHR){
    console.log(response);
    
    // marker στις τοποθεσίες που έχουν γίνει http αιτήσεις
    maxiter=response[0].length;
    for(i=0; i<maxiter; i++){
      let loc=response[0][i].loc.split(",");
      let loc_array=[parseFloat(loc[0]),parseFloat(loc[1])];
      var marker = new L.Marker(loc_array).addTo(map);
    }
    // marker στις τοποθεσίες των uploader
    maxiter_uploader=response[1].length;
    
    for(i=0; i<maxiter_uploader; i++){
      let loc=response[1][i].uploader_lat_long.split(",");
      let loc_array=[parseFloat(loc[0]),parseFloat(loc[1])];
      var marker_uploader= new L.Marker(loc_array, {icon: redIcon}).addTo(map).bindPopup("Uploaders : "+response[1][i].numberofuploaders).openPopup();
    }
    // ανάκτησε το μέγιστο πλήθος request που έχει δεχτεί ένα ip 
    var max_count=response[3][0].maximum;

    // draw polylines για κάθε request του uploader σε κάθε ip(marker)
    maxiter_server=response[2].length;
    for(i=0; i<maxiter_server; i++){
      let loc_server=response[2][i].loc.split(",");
      let loc_array_ser=[parseFloat(loc_server[0]),parseFloat(loc_server[1])];
      let loc_uploader=response[2][i].uploader_lat_long.split(",");
      let loc_array_up=[parseFloat(loc_uploader[0]),parseFloat(loc_uploader[1])];
      let temp_count=response[2][i].count;
      var polyline= new L.polyline([loc_array_ser,loc_array_up],{weight:8*(temp_count/max_count)}).addTo(map)
    }
   
  

    
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