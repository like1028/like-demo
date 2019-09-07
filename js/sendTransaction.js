let exec = require('child_process').exec;


let sendTransaction = () => {
    let sendTxCmd = `curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from": "0x37eeb099c6d751e7229df825d40629612e134f82","to": "0x6ee600fc8e27c562a63ff5e56d1b788bca6f5c2e","gas": "0x76c0","gasPrice": "0x2540be400","value": "0x1","data": ""}],"id":1}' -H 'content-type: application/json;' http://127.0.0.1:7000/intchain`;
    for (var i = 0; i < 4; i++) {
        exec(sendTxCmd, (err, stdout, stderr) => {
            if (err) {
                console.error(`执行错误：${err}`);
                // reject(err)
            }
            console.log(`发送成功：${stdout}`);
        })
    }
    // exec(sendTxCmd, (err, stdout, stderr) => {
    //     if (err) {
    //         console.error(`执行错误：${err}`);
    //         // reject(err)
    //     }
    //     console.log(`发送成功：${stdout}`);
    // })
}

setInterval(() => {
    sendTransaction()
}, 1 );

// while (true) {
//     sendTransaction()
// }

// for(let i = 0; i < 1000000; i++) {
//     sendTransaction()
// }



