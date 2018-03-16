/*var myLogModule = require('./log.js');
myLogModule.log.info('Hello its me');

var greetMe = function(){
    console.log("hai");
}

var greetWorld = function(){
    console.log("world");
}

function log(fn){
    fn();
}

greetMe();
log(greetWorld);*/

function download(started, update, completed){
    var i = 0;
    started();
    for (i = 0; i <=100; i ++){
        update(i);
    }
    completed();
}

var started = function(){
    console.log("Starting Download");
}

var update = function(dw){
    console.log(dw + "% of Download");
}

var completed = function(){
    console.log("Download Completed!");
}

download(started, update, completed);

var myLogModule = require('./ArrayUtils.js');
console.log("Exercicio 4a:");
console.log(myLogModule.isEmpty([]));
console.log(myLogModule.isEmpty([1,2,3,4]));
console.log("Exercicio 4b:");
console.log(myLogModule.maxArray([2,55,1,34,213,532,31,1,23,45,32]));
console.log("Exercicio 4c:");
console.log(myLogModule.minArray([2,55,1,34,213,532,31,1,23,45,32]));
console.log("Exercicio 4d:");
console.log(myLogModule.mediaArray([2,55,1,34,213,532,31,1,23,45,32]));
console.log("Exercicio 4e:");
console.log(myLogModule.indexOf([2,55,1,34,213,532,31,1,23,45,32], 31));
console.log("Exercicio 4f:");
console.log(myLogModule.subArray([2,55,1,34,213,532,31,1,23,45,32], 4, 6));
console.log("Exercicio 4g:");
console.log(myLogModule.isSameLength([2,55], [4, 6]));
console.log("Exercicio 4h:");
console.log(myLogModule.revArray([2,55,1,34,213,532,31,1,23,45,32]));
console.log("Exercicio 4i:");
console.log(myLogModule.revArray([2,55,1,34], 2, 3));