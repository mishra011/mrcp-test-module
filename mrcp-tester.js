
const crypto = require('crypto');
var fs = require('fs');
var net = require('net');

var port = 1339;
var host = "localhost";
var sleep = require('system-sleep');


var connect_params = {host:host, port:port};
console.log("Connect Params :: ", connect_params);

var filePath = "wavs/test.wav";
//filePath = "wavs/hello.wav"
//filePath = "wavs/test_trimmed.wav"
//filePath = "yes.wav"

console.log(filePath)

var thisUniqueSessionId = crypto.randomUUID();
var nBestListLength = 1;
var language = "en-IN";
//language = "en-IN|||hi-IN";
//language = "hi-IN|||en-IN";
//language = "mr-IN|||hi-IN|||en-IN";
//language = "hi-IN|||en-IN|||mr-IN";

var grammar = "test.json/yes";
var thisBotId = "compaas-dummy";
var thisBotSessionId = "MOB_NUM--" + crypto.randomUUID();

var asrName = "ameyo";
//asrName = "google";

//asrName = "reverie";

let asrInput = `${thisUniqueSessionId},${nBestListLength},${language},${grammar}-----${language}--${thisBotId}--${thisBotSessionId}-----${asrName}\n`;

console.log("MRCP HEADER :: ", asrInput);

var earlyExit = true;
earlyExit = false;


var client = net.connect(connect_params, async function() {
   console.log('connected to MRCP server!');
   client.write(asrInput);
   //sleep(15000);

    if (earlyExit){
   	client.end();
   }
   else {
   fs.readFile(filePath, (err, data) => {
      console.log("Sending media chunks to Mrcp Server")
      //console.log(data);
      client.write(data);
      //client.write(data.toString());

    });  
	if (false){
		client.end();
	};	
    }     
  

});

client.on('data', function(data) {
   console.log("Data Received from Server ::");
   console.log(data.toString());
   //client.end();
});

client.on('end', function() { 
   console.log('disconnected from server');
})




