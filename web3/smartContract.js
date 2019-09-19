/**
 *@fileName smartContract.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2017/12/23
 *@disc
 */

const solc = require('solc');

const input = {
    language : 'Solidity',
    sources: {
        'test.sol': {
            content: 'pragma solidity ^0.5.11; contract test { function multiply(uint a) public pure returns(uint d) {   return a * 7;   } }'
            // content: 'pragma solidity ^0.4.12; contract test { function multiply(uint a) public pure returns(uint d) {   return a * 7;   } }'
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(output);
console.log(output.contracts);
console.log(output.contracts['test.sol'].test.abi);
console.log(output.sources);

for (var contractName in output.contracts['test.sol']) {
    console.log(contractName + ': ' + output.contracts['test.sol'][contractName].evm.bytecode.object);
    console.log('abi' + ': ' + output.contracts['test.sol'][contractName].abi)
}
