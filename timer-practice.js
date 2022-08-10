


var timeout = 10000;
var startTime = new Date();


function Timeout(param) {
    console.log("Timeout Function Executed", param);
    var exetime = new Date().getTime() - startTime.getTime();
    console.log("TIME OF EXE :: ", exetime);
}

var timeoutObj = setTimeout(Timeout, timeout, "setting");

var sleep = require('system-sleep');
sleep(10000); // 5 seconds


if (true){
clearTimeout(timeoutObj, 'clearing');
console.log("Timeout Cleared")
var intime = new Date().getTime() - startTime.getTime();
console.log("TIME OF INTERING :: ", intime);
}