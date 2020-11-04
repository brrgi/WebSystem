let globalFunc;
{   
    let blockVar='a';
    globalFunc=function(){
        console.log(blockVar);
    }
}
globalFunc();