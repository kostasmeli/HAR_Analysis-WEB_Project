
//const pattern={
//  log:{
 //   entries:[{
 //     request:{
  //      method:/.*/,
 //       url:/(\/\/\w*.*)\//,
   //     headers:[{ 
   //     }]
   //   },
   //   serverIPAddress: /.*/,
   //   startedDateTime: /.*/,
   //   timings:{
    //    wait: /\d*/,
   //   }
 //   }]
 // }  
//} 

const button=document.querySelector('input[id="sbutton"]');
button.addEventListener("click",function(e){
  const reader = new FileReader();
  input=document.querySelector('input[id="formFile"]');
  reader.readAsText(input.files[0]);
  reader.onload=function(){
    tmp=this.result;
    d1=JSON.parse(tmp);
    maxiter=d1.log.entries.length;
    sip=new Array();
    sdatetime= new Array();
    timings= new Array();
    rmethod= new Array();
    rurl = new Array();

    for(let i=0; i<maxiter; i++){
      sip.push(d1.log.entries[i].serverIPAddress);
      sdatetime.push(d1.log.entries[i].startedDateTime);
      timings.push(d1.log.entries[i].timings.wait);
      rmethod.push(d1.log.entries[i].request.method);
      rurl.push(d1.log.entries[i].request.url.match(/(\/\/\w*.*)\//));
    }
    console.log(sip,'/n',sdatetime,'/n',timings);
    console.log(rurl);
    
  }
},false)