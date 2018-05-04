/**
 *@fileName smartContract.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2017/12/23
 *@disc
 */
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const solc = require('solc');
let source = "contract test { function multiply(uint a) returns(uint d) { return a * 7; }}";
// console.log(solc);
let compiled = solc.compile(source);
let contract = 'test';
let contractClass = ":" + contract;

let abiDefinition = JSON.parse(compiled.contracts[contractClass].interface);
// console.log("abiDefinition:"+abiDefinition);
let Abi = compiled.contracts[contractClass].interface;
// console.log("Abi:"+Abi);
let Code = compiled.contracts[contractClass].bytecode;
// console.log("Code:"+Code);
let myContract = new web3.eth.Contract(abiDefinition);
// console.log("myContract:"+myContract);

myContract.deploy({ data: Code }).send({
    from: '0xc469382f43936834ceaef1c3fa67e0f796406cd7',
    gas: 1500000,
    gasPrice: '30000000000000'
}, function (error, transactionHash) {
    if (error) {
        console.error(error);
    }
    console.log(transactionHash);
//记得写个地址不然会不能调用
    myContract.options.address = '0xabd403c1eee32aedb3bbce90061808774be13d5c';
// multiply是合约中的方法
    myContract.methods.multiply(12).call({ from: '0xabd403c1eee32aedb3bbce90061808774be13d5c' }).then(
        function (result) {
            console.log(result)
            //正确结果应该是84
        }
    )
});
