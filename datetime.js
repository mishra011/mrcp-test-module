

var d = new Date().toISOString().replace('T', ' ').substr(0, 19)
//var d = new Date()

var d = new Date().toISOString().replace('T', ' ').substring(0,10)
console.log(d, "OK");

//console.log(d.substring(0,10), "OK");

