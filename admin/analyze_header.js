$(function(){
  //ajax για να αποκτήσει τους πάροχους που υπάρχουν στην βάση
  request1=$.ajax({
    type:"GET",
    url:"uploaders.php",
    dataType:'json'
  });
  request1.done(function(response,textStatus,jqXHR){
    //δημιουργία button για κάθε πάροχο που ανέκτησε
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
    //όταν καποιο απο τα button που δημιουργήθηκαν γίνει κλικ, ανέκτησε το value  του button που δείχνει τον πάροχο και ύστερα εκτέλεσε το query με βάση τον πάροχο που επιλέχθηκε.Τέλος επιστρέφονται τα αποτελέσματα και δημιουργούνται τα διαγράμματα
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
      //πλήθος αιτημάτων που έχει το κάθε content type

      maxiter=response[0].length;
      //διατρέχουμε τα response cache control και κάνουμε split το string με βάση το κόμμα έτσι ωστε να μπορέσουμε να ελέξγχουμε αν στο array που δημιουργήθηκε υπάρχει κάποιο απο τα string που μας ενδιαφέρει, αν ναι τότε αλλάζουμε το value του response_cache_control στο json ανάλογα, αλλιώς το κάνουμε not-found.
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
      //κρατάμε μονο οσες εγγραφές δεν εχουν ως value το not-found
       var cachetemp=response[0].filter(element=>element.response_cache_control!=="not-found");
       
      //μετράω πόσες φορές υπάρχει το κάθε content-type/cache-control πως ακριβως???

      //δημιουργεί ενα map m και ύστερα πάει το json cachetemp και για κάθε  
      const m = new Map();
      cachetemp.forEach(({response_content_type, response_cache_control}) => {
    //δημιουργούμε δύο  λίστες με key,value  το content_type και cache_control , και τα κάνουμε stringιfy και ύστερα θέτουμε στο key το συγκεκριμένο string και value το πόσες φορές εμφανίζεται αυτό το string + 1
    const hash = JSON.stringify([['response_content_type', response_content_type], ['response_cache_control', response_cache_control]]);
    m.set(hash, (m.get(hash) || 0) + 1);
  });
    //υστερα κάνουμε το map σε array και κάνουμε map σε κάθε στοιχείο του array τα δυο στοιχεία που εμπεριέχει το κάθε array (array of arrays) . τα αποθηκεύουμε σε ενα json με έξτρα key-value το count: τιμή count
    const dedup = [...m].map(([rec, count]) => ({
    ...Object.fromEntries(JSON.parse(rec)),
    count,
  }))
      console.log(dedup)
    //ύστερα  κάνουμε ενα array  που περνάμε μονο τα content-type  και το κανουμε set και ξανα array για να απαλείψουμε τα διπλότυπα content-type. Μετά για κάθε ενα απο τα μοναδικα content-type βρίσκουμε το index που βρίσκεται στο αρχείο με το πλήθος αιτημάτων που εχουν γίνει για το συγκεκριμένο content type , ύστερα προσπελαύνω το index και ανακτώ το count που έχει , ύστερα κανω iterate μεσα στο dedup και προσθέτω στο key data που έχει ως value ενα array με τις πληροφορίες που θελει το γράφημα, στο τέλος το array data εχει json που είναι ετοιμα για να μπουν στο config του chartjs
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