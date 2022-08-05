
const crypto = require('crypto');
var fs = require('fs');
var net = require('net');

var port = 1339;
var host = "locahost";


var connect_params = {host:host, port:port};
console.log("Connect Params :: ", connect_params);

var filePath = "wavs/test.wav";
//filePath = "wavs/hello.wav"
filePath = "wavs/test_trimmed.wav"


var thisUniqueSessionId = crypto.randomUUID();
var nBestListLength = 1;
var language = "en-IN";
//language = "en-IN|||hi-IN";
//language = "hi-IN";

var grammar = "test.json";
var thisBotId = "testbotdummy";
var thisBotSessionId = crypto.randomUUID();

var asrName = "ameyo";
//asrName = "google";

let asrInput = `${thisUniqueSessionId},${nBestListLength},${language},${grammar}-----${language}--${thisBotId}--${thisBotSessionId}-----${asrName}\n`;

console.log("MRCP HEADER :: ", asrInput);



var client = net.connect(connect_params, async function() {
   console.log('connected to MRCP server!');
   client.write(asrInput);
   
   fs.readFile(filePath, (err, data) => {
      console.log("Sending media chunks to Mrcp Server")
      //console.log(data);
      client.write(data);
    });       
    

});

client.on('data', function(data) {
   console.log("Data Received from Server ::");
   console.log(data.toString());
   client.end();
});

client.on('end', function() { 
   console.log('disconnected from server');
})




/*** 
var net = require('net');
var fs = require('fs');

convertBotResponseToASRInput_STR(botResp, customProps, thisBotId, thisBotSessionId, thisUniqueSessionId) {
    console.log("====  ASR INP :: STRING === ");
    let nBestListLength = ('nBestListLength' in customProps)? customProps.nBestListLength: 1;
    let language = botResp.languageCode;
    let grammar = ('defaultASRGrammar' in customProps)? customProps.defaultASRGrammar: botResp.nextAsrGrammar;
    let asrInput = `${thisUniqueSessionId},${nBestListLength},${language},${grammar}-----${language}--${thisBotId}--${thisBotSessionId}\n`;
    return asrInput;
}

***/