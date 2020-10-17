const fs=require('fs');
fs.readdir("./some-dir", (err, files)=>{
    if(err){
        console.error(err);
    }
    console.log(files);
})

const files=fs.readdirSync("./some-dir")
console.log(files);