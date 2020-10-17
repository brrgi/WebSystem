const fs=require('fs');                     //fs내장 모듈을 불러온다.
fs.readFile('flags.txt', 'utf8' ,(err, data)=>{  //
    if(err){
        console.error(err);
    }
    console.log(data.toString());
})