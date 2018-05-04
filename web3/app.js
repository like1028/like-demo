/**
 *@file     app.js
 *@author   Like (978885880@qq.com)
 *@date     2017/12/22
 *@disc
 */
const Web3 = require('web3');
// console.log(Web3);
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
// console.log(web3);
// const solc = require('solc'); //solc编译器编译智能合约
// // json interface describing the ABI for an Ethereum smart contract
let source = "contract test { function multiply(uint a) returns(uint d) { return a * 7; }}";
// let compiled = solc.compile(source);
// console.log(compiled);
// let eth = web3.eth;
// web3.eth.getAccounts(console.log); // eth_accounts dose not exist/ is not available
web3.eth.defaultAccount = '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe'; // default "from"
// web3.eth.sendTransaction();
// web3.eth.call();
// var b = web3.eth.defaultBlock;
// console.log(b);
// var c = web3.eth.getCoinbase();
// console.log(c);
// var d = web3.eth.getAccounts();
// console.log(d);
// web3.eth.compile.solidity(source).then(console.log);
// web3.eth.subscribe('newBlockHeaders');
// new web3.eth.Contract(jsonInterface);
// var Accounts = web3.eth.accounts;
// console.log(Accounts);
// var account = web3.eth.accounts.create();
// console.log(account);
// var keyStore = web3.eth.accounts.encrypt(privateKey, password);
web3.eth.accounts.decrypt(keystoreJsonV3, password);





















