console.log("Before timeout: " + new Date());
function f(){
    console.log("After timeout: "+new Date());
}
setTimeout(f, 60*100);
console.log("Hi");
console.log("Me Too");