let exec = require('child_process').exec;
let fs = require('fs');
let moment = require('moment');
let maxHeight = 0;
let getMaxHeight = ()=>{
    return new Promise((resolve,reject)=>{
        let cmdBlock =  `curl -X POST --data '{"funName":"getBlock", "args":{ "which": "latest", "transactions": true}}' http://127.0.0.1:8555/rpc`;
        exec(cmdBlock, function (err, stdout, srderr) {
            if(err) {
                reject({err:"异常"});
            } else {
                let r = JSON.parse(stdout);
                if (!r.err) {
                    resolve(r.block.number)
                } else {
                    resolve(maxHeight)
                }
            }
        });
    })
}


let watchPeer = async()=>{
    let newMaxHeight = await getMaxHeight();
    if(isNaN(newMaxHeight)){ return }
    if(maxHeight != newMaxHeight){
        maxHeight = newMaxHeight
    }else{
        let cmdRestartPeer = 'pm2 restart 2';
        exec(cmdRestartPeer,(err1, stdout1, srderr1)=>{
            if(err1){
                console.log(srderr1)
            }else{
                fs.appendFile('./peer-log.txt',`\n ${moment().format("YYYY-MM-DD hh:mm:ss")},已为您重启，块高${maxHeight}`,(error)=>{})
            }
        })
    }
}


setInterval(()=>{
    watchPeer()
},1000*60*5);