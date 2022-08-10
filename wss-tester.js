
const crypto = require('crypto');
var fs = require('fs');
var net = require('net');
const WebSocket = require('ws');

var port = 1339;
var host = "localhost";
var sleep = require('system-sleep');


var connect_params = {host:host, port:port};
console.log("Connect Params :: ", connect_params);

var filePath = "wavs/test.wav";
//filePath = "wavs/hello.wav"
//filePath = "wavs/test_trimmed.wav"
//filePath = "128.wav"


var thisUniqueSessionId = crypto.randomUUID();
var nBestListLength = 1;
var language = "en-IN";
//language = "en-IN|||hi-IN";
//language = "hi-IN";

var grammar = [];
var thisBotId = "testbotdummy";
var thisBotSessionId = "MOB_NUM--" + crypto.randomUUID();
var callSId = crypto.randomUUID();
var asrName = "ameyo";
//asrName = "google";

var barge = false;
var alt_languages = [language];
//let asrInput = `${thisUniqueSessionId},${nBestListLength},${language},${grammar}-----${language}--${thisBotId}--${thisBotSessionId}-----${asrName}\n`;




let asrInput = {
   "UniqueSessionId": thisUniqueSessionId,
   "nBestListLength": nBestListLength,
   "language": language,
   "grammer": grammar,
   "BotSessionId": thisBotSessionId,
   "asrProvider": asrName,
   "bot_id": thisBotId,
   "metadata": {},
   "alt_languages": alt_languages,
  "barge": barge,
   "CallSid": callSId

}

console.log("ASR INPUT DATA :: ", asrInput);

asrInput = JSON.stringify(asrInput);


var url = "http://"+ host + ":" + port;
const ws = new WebSocket(url);

ws.on('open', function open() {
   console.log("SENDING ASR INPUT DATA");
   ws.send(asrInput);

   fs.readFile(filePath, (err, data) => {
      console.log("Sending media chunks to ASR Server")
      //console.log(data);
      ws.send(data);

   //ws.close();
    });      

 });


 ws.on('message', function message(data) {
   console.log('Response Received from Server :: ', data);
   ws.close();
 });

