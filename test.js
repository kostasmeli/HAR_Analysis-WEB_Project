
const button=document.querySelector('input[id="sbutton"]');
button.addEventListener("click",function(e){
  const reader = new FileReader();
  input=document.querySelector('input[id="formFile"]');
  reader.readAsText(input.files[0]);
  reader.onload=function(){
    tmp=this.result;
    d1=JSON.parse(tmp);
    maxiter=d1.log.entries.length;
    var boo = d1.log.entries;
    var foo = {};
    var entries_array=new Array();
    for(let i=0; i<maxiter; i++){
      foo["serverIPAddress"]=boo[i].serverIPAddress;
      foo["startedDateTime"]=boo[i].startedDateTime;
      foo["timings"]={};
      foo["timings"]["wait"]=boo[i].timings.wait;
      foo["request"]={};
      foo["request"]["method"]=boo[i].request.method;
      foo["request"]["url"]=boo[i].request.url.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/);
      foo["request"]["headers"]={};
      if(boo[i].request.headers.some(element=>boo[i].request.headers.name==="content-type")){
        let index= boo[i].request.headers.find(element=>element=="content-type");
        foo["request"]["headers"]["content-type"]=index.value;
      }
      else{
        foo["request"]["headers"]["content-type"]="empty";
      }
      if(boo[i].request.headers.some(element=>boo[i].request.headers.name==="cache-control")){
        
      }
     }
    }
    
  }
},false)