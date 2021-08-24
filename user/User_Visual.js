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
    //πηγαινει σε κάθε har και σε κάθε entry του har και αποθηκεύει τις συντεταγμένες σε ενα array απο json
    for (let x=0; x<har_array.length; x++){
      for(let i=0; i<har_array[x].entries_array.length; i++){
          let temp={loc:har_array[x].entries_array[i].server_gloc};
          infoloc.push(temp);
      }
    }
    //διατρέχει ολο το array με τις συντεταγμένες , και για καθε μια , ελέγχει ολο το array για να βρει ποσες φορές υπάρχει μεσα στο array και αποθηκεύει την τιμή αυτή σε καθε json του array στο counter:....;
    var maxiter=infoloc.length;
    for(let i=0; i<maxiter; i++){
      var temp=infoloc[i].loc;
      let counter=0;
      for(let x=0; x<maxiter; x++){
        if(temp===infoloc[x].loc){
          counter++;
        }
      }
      infoloc[i].counter=counter;
    }
    // δημιουργώ ενα array μονο με τις τιμές των counter και βρίσκω μεγιστη και ελάχιστη τιμή
    var array_counter = $.map(infoloc, function(o){ return o.counter; });
    var highest = Math.max.apply(this,array_counter);
    var minimum = Math.min.apply(this,array_counter);
    //επιστρέφει στο locs ολα τα string με τις συντεταγμενες και το χρησιμοποιεί για να κανει δημιουργήσει το filtered_data που δεν περιέχει διπλότυπες συντεταγμένες.
    var locs = $.map(infoloc,function(o){return o.loc;});
    var filtered_data = infoloc.filter(({loc}, index) => !locs.includes(loc, index + 1)) 
    //μορφοποιούμε το filtered_data για να ειναι σε κατάλληλη μορφή για να το περάσουμε στο heatmap
    for (temploc of filtered_data){
      let array=temploc.loc.split(",");
      temploc.lat=parseFloat(array[0]);
      temploc.lng=parseFloat(array[1]);
      delete temploc.loc;
    }
    console.log(filtered_data);
    console.log(highest,minimum);
    //console.log(infoloc);


    var testData = {
      max:highest,
      data:filtered_data
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
    "scaleRadius":false,
    "useLocalExtrema": false,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'counter'
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