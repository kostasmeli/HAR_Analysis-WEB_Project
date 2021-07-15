
const button=document.querySelector('input[id="sbutton"]');
button.addEventListener("click",function(e){
  const reader = new FileReader();
  input=document.querySelector('input[id="formFile"]');
  reader.readAsText(input.files[0]);
  reader.onload=function(){
    tmp=this.result;
    d1=JSON.parse(tmp);
    maxiter=d1.log.entries.length;
    var entries_array=new Array();
    for(let i=0; i<maxiter; i++){
      let entry={};
      entry["serverIPAddress"]=d1.log.entries[i].serverIPAddress;
      entry["startedDateTime"]=d1.log.entries[i].startedDateTime;
      entry["timings"]={};
      entry["timings"]["wait"]=d1.log.entries[i].timings.wait;
      //Request 
      entry["request"]={};
      entry["request"]["method"]=d1.log.entries[i].request.method;
      entry["request"]["url"]=d1.log.entries[i].request.url.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/);
      //Request Headers
      entry["request"]["headers"]={};
      if(d1.log.entries[i].request.headers.some(element=>element.name.toLowerCase()==="content-type")){
        let index= d1.log.entries[i].request.headers.find(element=>element.name.toLowerCase()=="content-type");
        entry["request"]["headers"]["content-type"]=index.value;
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
        entry["response"]["headers"]["content-type"]=index.value;
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
     //console.log(entries_array[0].response.headers["last-modified"]);
     json_entries={entries_array};
     if(!document.querySelector('input[id="dbutton"]')){
     let btn = document.createElement("input");
      btn.className = "btn btn-success";
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
        data=JSON.stringify(json_entries,null,"\t");
       download("filtered_file.har", data);
      });
     document.getElementById("downloadbutton").appendChild(btn);
    }
  }
},false)