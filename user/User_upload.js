const button=document.querySelector('input[id="sbutton"]');
$("#formFile").change(function(){
  $("#dbutton").remove();
  $("#upbutton").remove();
})
button.addEventListener("click",function(e){
  const reader = new FileReader();
  input=document.querySelector('input[id="formFile"]');
  if(input.files[0])
  { 
    reader.readAsText(input.files[0])
    reader.onload=getText;
    async function getText(e){
      var filename = input.files[0].name;
      var weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      tmp=this.result;
      d1=JSON.parse(tmp);
      maxiter=d1.log.entries.length;
      var entries_array=new Array();
      for(let i=0; i<maxiter; i++){
        let entry={};
        entry["serverIPAddress"]=d1.log.entries[i].serverIPAddress.replace("[","").replace("]","");
        entry["startedDateTime"]=d1.log.entries[i].startedDateTime.replace("[","").replace("]","");
        entry["timings"]={};
        entry["timings"]["wait"]=d1.log.entries[i].timings.wait;
        //Request 
        entry["request"]={};
        entry["request"]["method"]=d1.log.entries[i].request.method;
        tempurl= new URL(d1.log.entries[i].request.url.toString());
        entry["request"]["url"]=tempurl.hostname.replace('www.','');
        //Request Headers
        entry["request"]["headers"]={};
        if(d1.log.entries[i].request.headers.some(element=>element.name.toLowerCase()==="content-type")){
          let index= d1.log.entries[i].request.headers.find(element=>element.name.toLowerCase()=="content-type");
          temp_content=index.value.match(/[a-zA-Z0-9]*\/[a-zA-Z0-9+-.]*\;/);
          if(temp_content){
            entry["request"]["headers"]["content-type"]=temp_content[0].replace(";","");
          }else{
            entry["request"]["headers"]["content-type"]=index.value;
          }
        }
        else
        {
          entry["request"]["headers"]["content-type"]="empty";
        }
        if(d1.log.entries[i].request.headers.some(element=>element.name.toLowerCase()==="cache-control")){
          let index = d1.log.entries[i].request.headers.find(element=>element.name.toLowerCase()=="cache-control");
          entry["request"]["headers"]["cache-control"]=index.value;
        }
        else
        {
          entry["request"]["headers"]["cache-control"]="empty";
        }
        if(d1.log.entries[i].request.headers.some(element=>element.name.toLowerCase()==="pragma")){
          let index = d1.log.entries[i].request.headers.find(element=>element.name.toLowerCase()=="pragma");
          entry["request"]["headers"]["pragma"]= index.value;
        }
        else
        {
          entry["request"]["headers"]["pragma"]="empty";
        }
        if(d1.log.entries[i].request.headers.some(element=>element.name.toLowerCase()==="host")){
          let index = d1.log.entries[i].request.headers.find(element=>element.name.toLowerCase()=="host");
          entry["request"]["headers"]["host"] = index.value;
        }
        else
        {
          entry["request"]["headers"]["host"]= "empty";
        }
        //Response 
        entry["response"]={};
        entry["response"]["status"]=d1.log.entries[i].response.status;
        entry["response"]["statusText"]=d1.log.entries[i].response.statusText;
        //Response Headers
        entry["response"]["headers"]={};
        if(d1.log.entries[i].response.headers.some(element=>element.name.toLowerCase()==="content-type")){
          let index = d1.log.entries[i].response.headers.find(element=>element.name.toLowerCase()=="content-type");
          temp_content=index.value.match(/[a-zA-Z0-9]*\/[a-zA-Z0-9+-.]*\;/);
          if(temp_content){
            entry["response"]["headers"]["content-type"]=temp_content[0].replace(";","");
          }else{
            entry["response"]["headers"]["content-type"]=index.value;
          }
          
        }
        else
        {
          entry["response"]["headers"]["content-type"]="empty";
        }
        if(d1.log.entries[i].response.headers.some(element=>element.name.toLowerCase()==="cache-control")){
          let index = d1.log.entries[i].response.headers.find(element=>element.name.toLowerCase()=="cache-control");
          entry["response"]["headers"]["cache-control"]=index.value;
        }
        else
        {
          entry["response"]["headers"]["cache-control"]="empty";
        }
        if(d1.log.entries[i].response.headers.some(element=>element.name.toLowerCase()==="pragma")){
          let index = d1.log.entries[i].response.headers.find(element=>element.name.toLowerCase()=="pragma");
          entry["response"]["headers"]["pragma"]=index.value;
        }
        else
        {
          entry["response"]["headers"]["pragma"]="empty";
        }
        if(d1.log.entries[i].response.headers.some(element=>element.name.toLowerCase()==="expires")){
          let index = d1.log.entries[i].response.headers.find(element=>element.name.toLowerCase()=="expires");
          entry["response"]["headers"]["expires"]=index.value;
        }
        else
        {
          entry["response"]["headers"]["expires"]="empty";
        }
        if(d1.log.entries[i].response.headers.some(element=>element.name.toLowerCase()==="age")){
          let index = d1.log.entries[i].response.headers.find(element=>element.name.toLowerCase()=="age");
          entry["response"]["headers"]["age"]=index.value;
        }
        else
        {
          entry["response"]["headers"]["age"]="empty";
        }
        if(d1.log.entries[i].response.headers.some(element=>element.name.toLowerCase()==="last-modified")){
          let index = d1.log.entries[i].response.headers.find(element=>element.name.toLowerCase()=="last-modified");
          entry["response"]["headers"]["last-modified"]=index.value;
        }
        else
        {
          entry["response"]["headers"]["last-modified"]="empty";
        }
        //console.log(entry);
        entries_array[i]=entry;
        
       }
       console.log(entries_array);
       json_entries={entries_array};
       var json_download=JSON.parse(JSON.stringify(json_entries));
       async function upload(json_entries) {
         temp=await userloc();
         json_entries.uploader={};
         json_entries.uploader.date_upload=new Date().toLocaleDateString();
         json_entries.uploader.provider=temp.provider;
         json_entries.uploader.geolocation=temp.glocation;
         json_entries.uploader.city=temp.city;
         json_entries.uploader.filename=filename;
         
        
  
        for(let i=0; i<json_entries.entries_array.length; i++){
          
          //μορφοποιήσε τα entries_array του json_entries για να σταλθεί στην βαση
          json_entries.entries_array[i].startedDateTime=json_entries.entries_array[i].startedDateTime.replace("T",' ').replace("Z", " ");
          json_entries.entries_array[i].server_gloc= await getgeoloc(json_entries.entries_array[i].serverIPAddress);
          json_entries.entries_array[i].data_id=i;
          let date=new Date(json_entries.entries_array[i].startedDateTime);
          json_entries.entries_array[i].weekday=weekday[date.getDay()];
        }
        
  
         async function getgeoloc(serverip){
          
          //freegoip="https://freegeoip.app/json/"+serverip;
          // sip="https://ipapi.co/" + serverip + "/json";
          // ipdata="https://api.ipdata.co/"+serverip+"?api-key=788efec831a52b60863709fdae17ff55503cafaa099ecfec07d0501e";
          // ip_api="http://ip-api.com/json/"+serverip;
           ipregistry="https://api.ipregistry.co/"+serverip+"?key=ls484pzb1hy72ef9"
           let loc= await fetch (ipregistry).then(response => response.json());
           latitude=loc.location.latitude;
           longitude=loc.location.longitude;
           server_gloc=latitude+","+longitude;
           return server_gloc;
         }
         async function userloc(){
          let [loc, dns] = await Promise.all([
            fetch('https://ipapi.co/json/').then(response => response.json()),
            fetch('http://edns.ip-api.com/json').then(response => response.json())]);
            latitude=loc.latitude;
            longitude=loc.longitude;
            glocation=latitude+","+longitude;
            city=loc.city;
            provider=dns.dns.geo;
            var info={};
            info.glocation=glocation;
            info.city=city;
            info.provider=provider;
            return info;
         }
         return json_entries;
       }
       if(!document.querySelector('input[id="dbutton"]')){
        let upbtn = document.createElement("input");
         upbtn.className ="btn btn-danger";
         upbtn.type="submit";
         upbtn.id="upbutton";
         upbtn.value="Upload to Server";
        let btn = document.createElement("input");
         btn.className = "btn btn-light";
         btn.type = "submit";
         btn.id = "dbutton";
         btn.value= "Download";
         function download(filename, text) {
           var element = document.createElement('a');
           element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
           element.setAttribute('download', filename);
       
           element.style.display = 'none';
           document.body.appendChild(element);
       
           element.click();
       
           document.body.removeChild(element);
         }
         btn.addEventListener("click", function () {
           data=JSON.stringify(json_download,null,"\t");
          download("filtered_file.har", data);
         });
         upbtn.addEventListener("click",function (){
          console.log("fetch info");
          $("#loading_text").text("Currently Uploading,Please Wait");
          upload(json_entries).then(data=>{console.log(data);
           var har=data;
          console.log("fetch completed");
          request=$.ajax({
            type: "POST",
            url:"User_upload.php",
            data:JSON.stringify(data)
          });
          request.done(function(response,TextStatus,jqXHR){
            if(response=="success"){
              $("#loading_text").text("Successfully Uploaded");
              console.log("data uploaded");
              setTimeout( function(){$("#loading_text").text("")},5*1000);
            }
            else{
              $("#loading_text").text("Error Occurred,Please Try Again");
              setTimeout( function(){$("#loading_text").text("")},5*1000);
            }
          });
          
          
          })
         });
        document.getElementById("downloadbutton").appendChild(btn);
        document.getElementById("uploadbutton").appendChild(upbtn);
        
       
       }
    }
  }
  else{
    $("#loading_text").text("Please select a file");
    setTimeout( function(){$("#loading_text").text("")},3*1000);
  }

},false);