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

var port = 1339;
var fs = require('fs');

var filePath = "test.wav";
var thisUniqueSessionId = "sess2";
var nBestListLength = 1;
var language = "en-IN";
var grammar = [];
var thisBotId = "1";
var thisBotSessionId = "call1";

let asrInput = `${thisUniqueSessionId},${nBestListLength},${language},${grammar}-----${language}--${thisBotId}--${thisBotSessionId}\n`;


var net = require('net');
var client = net.connect({port: port}, function() {
   console.log('connected to server!');
   client.write(asrInput);
   //file = fs.createWriteStream(filePath);
   
   /***
   fs.readFile(filePath, (err, data) => {
    console.log(data);
    client.write(data);
    });
    
    fs.createReadStream(filePath, (err, data) => {
        console.log(data);
        client.write(data.toString());
        });

    
    
    var stream;
        //var start = 44;
        stream = fs.createReadStream(filePath);
        stream.on("data", function(data) {
            
            var chunk = data.toString();
            //console.log(chunk);
                client.write(chunk);
            });
    ***/
    const Throttle = require('throttle');  

    const throttle = new Throttle(128000 / 8);
    

    const readable = fs.createReadStream(filePath);

    readable.pipe(throttle).on('data', (chunk) => {
                
                    client.write(chunk);
            });
            
    

    /***
    var stream;
    //var start = 44;
    stream = fs.createReadStream(filePath);
    stream.on("data", function(data) {
        var chunksize = 16000;
        var start = 44;
        //var chunk = data.toString();
        //console.log(chunk);
        while(start < data.length + chunksize){
            console.log(start);
            let payload = data.slice(start, start + chunksize);
            payload = payload.toString();
            //payload = Buffer.from(payload, 'binary').toString('base64');

            start = start + chunksize;
            client.write(payload);
        });
    
    ***/


  
   
});

client.on('data', function(data) {
   console.log(data.toString());
   console.log("DATA RECEIVED")
   client.end();
});

client.on('end', function() { 
   console.log('disconnected from server');
});