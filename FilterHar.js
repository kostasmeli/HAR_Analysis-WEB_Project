const input = document.getElementById('file_sel');
const butnSelector = document.getElementById('sv');
const butnDownload = document.getElementById('sbutton');

class harUsr{
    
    constructor(userId,entries,request,response,headers){

      this.userId = userId;
      this.entries = entries;
      this.request = request;
      this.response = response;
      this.headers = headers;

    }
    





}

/*
const userHar = {
   
    userId :0,
    usrIsp:'',
    usrLongtitude:0.0,
    usrLatitude:0.0,
    entries : {
      startedDateTime:'',
      timings = {
        wait:''
      },
      serverIPAddress:''
    },
    request = {
       
         method:'',
         url_domain:'',
         headers = {
           
            content_type:'',
            cache_control:'',
            pragma:'',
            expires:'',
            age:'',
            last_modified:'',
            host:''

         }
      },
   response = {
        
      status:'',
      statusText:'',
      headers = {
         
            content_type:'',
            cache_control:'',
            pragma:'',
            expires:'',
            age:'',
            last_modified:'',
            host:''

      

   }  
  }
}
*/
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


butnSelector.addEventListener("click",function(e){
   const reader = new FileReader();
  
   reader.readAsText(input.files[0]);
   reader.onload=function(){
    tmp=this.result;
    d1=JSON.parse(tmp);
    //console.log(tmp);
    console.log(d1);
    
    //console.log(d1.log.entries[0]);
    console.log(d1.log.entries[0]);
    maxlen=d1.log.entries.length;//maximum length for the entries
    //console.log(d1.log.serverIPAdress);
    /*var entries = d1.log.entries.map(f1 => { 
     */
     
     var entriesArr = new Array();
     var servIP = new Array();
     var startDateTime = new Array();
     var timingsWait = new Array();
     var method = new Array();
     var url_domn = new Array();
     var req_headrs = new Array();
     var resp_status = new Array();
     var resp_statTxt = new Array();
     var resp_headrs = new Array();
     //console.log(f1);

     //var UserId = new Array();
    /*for(let i=0; i<maxlen; i++){
      
      tempEntries = d1.log.entries[i];
      entriesArr.push(tempEntries);
    }*/
    
    for(let j=0;j<maxlen;j++){

      tempServIP = d1.log.entries[j].serverIPAddress;
      tempDateTime = d1.log.entries[j].startedDateTime;
      tempTimingsWait = d1.log.entries[j].timings.wait;
      tempMethod  = d1.log.entries[j].request.method;
      tempUrlDomain = d1.log.entries[j].request.url;
      tempReqHdrs = d1.log.entries[j].request.headers;
      tempRespStatus = d1.log.entries[j].response.status;
      tempRespStatusTxt = d1.log.entries[j].response.statusText;
      tempRespHdrs = d1.log.entries[j].response.headers;

      servIP.push(tempServIP);
      startDateTime.push(tempDateTime);
      timingsWait.push(tempTimingsWait);
      method.push(tempMethod);
      url_domn.push(tempUrlDomain);
      req_headrs.push(tempReqHdrs);
      resp_status.push(tempRespStatus);
      resp_statTxt.push(tempRespStatusTxt);
      resp_headrs.push(tempRespHdrs);
      
    }

    //return f1.serverIPAdress;
    console.log("Here is the 'entries' server IP adresses: "+ servIP);
    console.log("Here is the 'entries' startedDateTime: " + startDateTime);
    console.log("Here is the 'entries' timings_wait: "+ timingsWait);
    console.log("Here is the 'request' method: "+ method);
    console.log("Here is the 'request' url domain: "+ url_domn);
    console.log("Here is the 'request' headers: "+req_headrs);
    console.log("Here is the 'response' response status: "+ resp_status);
    console.log("Here is the 'response' response statusText: "+ resp_statTxt);
    console.log("Here is the 'response' response headers: "+ resp_headrs);
    //console.log("Here is the 'response' response headers,1st one: "+ resp_headrs[0][2].name);

   //})
   //console.log(entries.serverIPAdress);
        var obj = {
          table: []
        };
        
        for(let k=0; k<maxlen; k++){
        obj.table.push({entries: {
          startedDateTime:startDateTime[k],
          timings: {
            wait:timingsWait[k]
          },
          serverIPAddress: servIP[k]
        },
        request: {
          
            method:method[k],
            url_domain:url_domn[k],
            headers: {
              //temporarily we pass all headers even those that must be left out,so we must filter out the headers we dont want in the sanitized har file
                name:req_headrs[k].name, //name can be content-type,cache-control,pragma,expires,age,last-modified,host
                value:req_headrs[k].value //value has the actual value for the corresponding type of name which i list above
        
            }
          },
        response: {
            
          status:resp_status[k],
          statusText:resp_statTxt[k],
          headers: {
            
                name:resp_headrs[k].name,
                value:resp_headrs[k].value
          }  
        }
      });
      }


      var json = JSON.stringify(obj);//i turn the object to string so i can have a file that i can download

      console.log(json);

      //var fs = require('fs');

      //fs.writeFile('myjsonfile.json', json, 'utf8', callback);
   }
  
  
  
},false)



