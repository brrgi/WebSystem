const fs=require('fs');

fs.readFile("./some-text.txt", {encoding:'utf-8', flag:'r'}, (err, data)=>{
    if(err){console.error(err);}
    console.log(data);
})

const data=fs.readFileSync('./some-text.txt')      //block
console.log(data);