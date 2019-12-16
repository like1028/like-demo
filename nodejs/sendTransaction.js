let exec = require('child_process').exec;
let execSync = require('child_process').execSync;
let Nat = require("../lib/nat");
let Tx = require("../lib/transaction");

let account = {
    address: 'INT3Pkr1zMmk3mnFzihH5F4kNxFavJo4',
    privateKey: '0xc15c038a5a9f8f948a2ac0eb102c249e4ae1c4fa1f0971b50c63db46dc5fcf8b'
};

let Nonce = 0x0;

let getAccountNonce = () => {
    let getNonceCmd = `curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["INT3Pkr1zMmk3mnFzihH5F4kNxFavJo4", "latest"],"id":1}' -H 'content-type: application/json;' http://127.0.0.1:8555/testnet`;
    let r = execSync(getNonceCmd);
    console.log(r);
    // let res = JSON.parse(r);
    // Nonce = res.result;
    //
    // console.log(Nonce);
};

let sendSignTransaction = (nonce) => {
    for (let i = 0; i < 10; i++) {
        nonce += 0x1;
        console.log(nonce);
        let tx = {
            "chainId": "0x2",
            "nonce": nonce,
            "gasPrice": Nat.fromString("10000000000"),
            "gas": Nat.fromString("21000"),
            "to": '0x494e5433437046756b32634a31746539575a563177385933776b51436341355a',
            "value": Nat.fromString("1000000000000000000"),
            "data": "0x"
        }

        let r = Tx.sign(tx, account);

        let sendTxCmd = `curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["${r}"],"id":1}' -H 'content-type: application/json;' http://127.0.0.1:8555/testnet`;
        console.log(r);
        exec(sendTxCmd, (err, stdout, stderr) => {
            if (err) {
                console.log(`执行错误：${err}`);
            }
            console.log(`发送成功：${stdout}`);
        });
    }
    Nonce = nonce
};

let sendTransaction = () => {
    let sendTxCmd = `curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from": "INT3AadD8nRG5Vimzi5cnwDExEkMRAE9","to": "INT3AadD8nRG5Vimzi5cnwDExEkMRAE9","gas": "0x76c0","gasPrice": "0x2540be400","value": "0x1","data": ""}],"id":1}' -H 'content-type: application/json;' http://127.0.0.1:8555/testnet`;
    exec(sendTxCmd, (err, stdout, stderr) => {
        if (err) {
            console.error(`执行错误：${err}`);
            // reject(err)
        }
        console.log(`发送成功：${stdout}`);
    })
};

// setInterval(() => {
//     getAccountNonce()
// }, 1000);
// setInterval(() => {
//     // sendTransaction()
//     getAccountNonce();
//     sendSignTransaction(Nonce)
// }, 1000);


setInterval(() => {
    sendTransaction()
}, 100);
