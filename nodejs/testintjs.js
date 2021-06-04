const Intjs = require("intjs");

let intjs = new Intjs('', '', "https://public.mainnet.likeaixi.com");

process.nextTick(async () => {
    let blockNumber = await intjs.getBlock("latest", true);
    console.log(blockNumber);

    // let isValid = intjs.isValidAddress("INT1CgX8ZALjizHpjKBpMKMx9Vys8shDJDLUH")
    let isValid = intjs.isValidAddress("INT1MeFUUeM25qmKNnUY3PG8h5Hxixsqpsrkh")
    console.log(isValid);
});
