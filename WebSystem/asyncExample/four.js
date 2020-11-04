function doSomethingPromise(phase){
    return new Promise((resolve, reject)=>{
        if (phase>1){
            reject(new Error(`ERROR: ${phase} >1`))
        }
        else{
            resolve(phase)
        }
    })
}

async function myAsync(){
    try{
        const phase1=await doSomethingPromise(1)
        console.log(`Phase ${phase1}`)
        const phase2=await doSomethingPromise(2)
        console.log(`Phase ${phase2}`)     //여기 출력 안됌 이유는 16줄에서 reject
    }catch(err){
        console.log(err.message)
    }
}
myAsync()