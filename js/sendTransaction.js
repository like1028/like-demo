let exec = require('child_process').exec;


let sendTransaction = () => {
    let sendTxCmd = `curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from": "0x300f665a1ad625ff29ac38f7411bf415497bd044","to": "0x8e061bd52be96f01c0ec163d9f55d30a48b465b6","gas": "0x76c0","gasPrice": "0x2540be400","value": "0x1","data": ""}],"id":1}' -H 'content-type: application/json;' http://127.0.0.1/intchain`;
    exec(sendTxCmd, (err, stdout, stderr) => {
        if (err) {
            console.error(`执行错误：${err}`);
            // reject(err)
        }
        console.log(`发送成功：${stdout}`);
    })
}

setInterval(() => {
    sendTransaction()
}, 1 * 10);