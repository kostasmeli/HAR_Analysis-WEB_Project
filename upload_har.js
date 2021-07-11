$(() => {  
  $('#btnLoad').on('click', function (e) {

      var flag=0;
      var IpDb = {};
      var Ips=[];
      var geolocation;
      var city;
      var provider;
      var input;
      var file;
      var fr;
      var i=0;
      const res3=start();
  
      if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
      }
  
      input = document.getElementById('fileinput');
      if (!input) {
        alert("Can't find the file input element.");
      }
  
      else if (!input.files){
        alert("This browser doesn't seem to support the `files` property of file inputs.");
      }
  
      else if (!input.files[0]){
        alert("Please select a file before clicking 'Load'");
      }
  
      else {
        file = input.files[0];
        fr = new FileReader();

        fr.onload = receivedText;
        fr.readAsText(file);
      }
        
      console.log("DONE");
   
   
      
      // receivedText()
      async function receivedText(e) {
  
        let lines = e.target.result;
        var newArr = JSON.parse(lines); 
        var entries = newArr.log.entries;
      
        var pinakas=[];
      
        var i = 0;
        var dataid=0;
        const temp=await start();             //await: waits for a promise
        const values=await geolocations(entries,Ips,IpDb);
        IpDb=values["IpDb"];
        Ips=values["Ips"];
        
        //console.log("\n\nI GOT");
        //console.log(values);
        //console.log(temp);
        
        city=temp['city'];
        provider=temp['provider'];
        geolocation=temp['geolocation'];
        
        //entries.forEach(inentries);
          
        console.log("\n\n\n\n\n\n I GOT ALL THE IP'S LOCATIONS, CONTINUE WITH IPDS=");
        console.log(IpDb);
    
        for (obj of entries) {
          inentries(obj, provider, city, geolocation ,IpDb ); //call INENTRIES
        }
  
  
        // inentries()
        function inentries(obj, provider, city, geolocation ,IpDb ) {
          console.log("starting this user");
          //console.log(IpDb);
  
          var firstobject = {};       //object1 --> dhmiourgei 1 antikeimeno
        
          firstobject["StartedDateTime"] = obj.startedDateTime;
          firstobject["Wait"] = obj.timings.wait;
          firstobject["Status"] = obj.response.status;
          firstobject["StatusText"] = obj.response.statusText;
          
          ip=obj.serverIPAddress.replace('[','');
          ip=ip.replace(']','');
          
          firstobject["IpAddress"]=ip;
          firstobject["Geolocation"] = geolocation;
          firstobject["City"] = city;
          firstobject["provider"] = provider;
          firstobject["server_geolocation"]=IpDb[ip];

          //REQUEST.METHOD
          if(obj.request.method) {
            firstobject["Method"] = obj.request.method;
          }
          else {
            firstobject["Method"] = "Empty";
          }

          //REQUEST.URL
          if(obj.request.url) {
            let temp1=new URL(obj.request.url);
            temp1=domain_from_url(temp1);
            firstobject["Request url"] = temp1;
          }
          else {
            firstobject["Request url"] = "Empty";
          }

          head=obj.response.headers;
          if(head.some(object=>object.name==="content-type")){          //CONTENT-TYPE
            let obj = head.find(obj => obj.name == 'content-type');
            firstobject["Content Type"] = obj.value;
          }
          else{
            firstobject["Content Type"] = "Empty";
          }
  
          if(head.some(object=>object.name==="cache-control")){         //CACHE-CONTROL
            let obj = head.find(obj => obj.name == 'cache-control');
            firstobject["Cache-control"] = obj.value;
          }
          else{
            firstobject["Cache-control"] = "Empty";
          }
  
          if(head.some(object=>object.name==="pragma")){                //PRAGMA
            let obj = head.find(obj => obj.name == 'pragma');
            firstobject["Pragma"] = obj.value;
          }
          else{
            firstobject["Pragma"] = "Empty";
          }
  
          if(head.some(object=>object.name==="expires")){               //EXPIRES
            let obj = head.find(obj => obj.name == 'expires');
            firstobject["Expires"] = obj.value;
          }
          else{
            firstobject["Expires"] = "Empty";
          }
  
          if(head.some(object=>object.name==="age")){                   //AGE
            let obj = head.find(obj => obj.name == 'age');
            firstobject["Age"] = obj.value;
          }
          else{
            firstobject["Age"] = "Empty";
          }
  
          if(head.some(object=>object.name==="last-modified")){         //LAST-MODIFIED
            let obj = head.find(obj => obj.name == "last-modified");
            firstobject["Last-modified"] = obj.value;
          }
          else{
            firstobject["Last-modified"] = "Empty";
          }

          if(head.some(object=>object.name==="host")){                  //HOST
            let obj = head.find(obj => obj.name == 'host');
            firstobject["Host"] = obj.value;
          }
          else{
            firstobject["Host"] = "Empty";
          }
        
          i++; 	//INCREASE THE i COUNTER
          dataid++;
  
          //Editing fields 
          firstobject["StartedDateTime"]=firstobject["StartedDateTime"].replace(/([a-zA-Z])/g, ' ');
          firstobject["StartedDateTime"] = firstobject["StartedDateTime"].replace(/^\s+|\s+$/g, "");
          firstobject["Content Type"]=firstobject["Content Type"].split('/')[0];
          
          datadate=firstobject["StartedDateTime"].split(' ')[0];
                          
          var user = {
            userID: "1",                                      //eixe email
            startedDateTime:  firstobject["StartedDateTime"],
            wait: firstobject["Wait"],
            IpAddress: ip,
            Status: firstobject["Status"],
            StatusText : firstobject["StatusText"],
            geolocation: firstobject["Geolocation"],
            method:  firstobject["Method"],
            url: firstobject["Request url"],
            cacheControl:firstobject["Cache-control"],
            ContentType: firstobject["Content Type"],
            pragma: firstobject["Pragma"],
            expires: firstobject["Expires"] ,
            lastmod: firstobject["Last-modified"],
            host: firstobject["Host"],
            age:  firstobject['Age'],
            city:  firstobject["City"],
            provider: firstobject["provider"],
            dataid : dataid,
            datadate: datadate,          
            serverLocation: IpDb[ip]    //i στο 20
          };
  
          pinakas[i]=user;              //dhmiourgei pinaka me kaue ypokathgoria tou user --> pinakas
           
        
          if(i>20){	                    //goes to the next user probably	
            var cnt=0;                  //cnt --> count
            for(cnt=1; cnt<20; cnt++){	
              //pinakas[cnt]['serverLocation']=IpDb[pinakas[cnt]['IpAddress']];
              if(!(pinakas[cnt]['serverLocation'])){	
                console.log("THE IPS POSITION IN THE IPDB IS UNDEFINED");
                console.log(pinakas[cnt]['serverLocation']);
                console.log("I DONT HAVE GEO LOC FOR");
                console.log(pinakas[cnt]['IpAddress']);
                console.log("THE DATABASE HAS");
                console.log(IpDb);
                pinakas[cnt]['serverLocation']="No_Ip"; //dont have ip to get geoloc
              }
            }

            //console.log(pinakas);
            $.ajax({
              url: "file.php",
              type: "POST",
              data: { pinakas },

              success: function(data) {
                console.log(data);
              },
              error: function(xhr, status, error) {
                console.log(error);			  
              }
       
              }).done(function(datas){
                console.log(datas);
  
                }).fail(function(datas) {
                  console.log(datas);
                });
  
            pinakas=[];
            i=0;
          }
        }//closing inentries function
      }//closing receivedText function
    });

function domain_from_url(string1) {
    
    string1=string1.hostname;
    var result;
    var match;
    string1=string1.toString();
    var result = string1.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
    result = result.replace('files','').replace('static','').replace('','').split(/[/?#]/)[0];

    
    return result;
}



    
 async function start()
    {
       console.log("IN START");
      let [res1, res2] = await Promise.all([
            fetch('https://ipapi.co/json/').then(response => response.json()),
            fetch('http://lslslslslslslslslslslslslslslsls.edns.ip-api.com/json').then(response => response.json()),
                 
        ]);
      console.log("FETCHED START THINGS");
      latitude=res1.latitude.toString();
      longitude=res1.longitude.toString();
      geolocation=latitude.concat("/",longitude);   //concat: merge latitude, longtiture
      city=res1.city;
      provider=res2.dns.geo;
      
    var temp={}
    temp['geolocation']=geolocation;
    temp['city']=city;
    temp['provider']=provider;
    return temp;
}
    
    
    async function geolocations(entries,Ips,IpDb) //get geolocs function
    {
    for (obj of entries)
        {
            
            
            ip=obj.serverIPAddress;


            ip=ip.replace('[','');
            ip=ip.replace(']','');
         
         if(!(Ips.some(object=>object===ip)) && ip!="") //IF we dont have Ip go fetch its geolocation
         {  
            
            
            Ips.push(ip);
            
            string1="https://freegeoip.app/json/"
            target=string1 +ip;
            
            
            

                console.log("fetching nowww");
                
                const response= await fetch(target)
                .then(function(response) { return response.json(); })
                .then(json=> {

                  lat=json.latitude;
                  lon=json.longitude;
                  server_geolocation=lat + ',' + lon;
                  ip1=json.ip;
                  
                  
                  IpDb[ip1]=server_geolocation; //added geolocation to IpDb

                  return ;
                  
                 
                
                }).catch(function(error) {
        console.log(error)});
    
    }
}
    var values={}
    values['IpDb']=IpDb;
    values['Ips']=Ips;

    return values;
}	
    



  });