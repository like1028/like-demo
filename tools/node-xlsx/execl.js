/**
 *@fileName execl.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/7/17
 *@disc     nodejs 读取 exexl 文件内容
 */

const fs = require('fs');

//基于Node.js解析excel文件数据及生成excel文件，仅支持xlsx格式文件；
const xlsx = require('node-xlsx');


let excelObj = xlsx.parse("/Users/like/Downloads/node-xlsx.xlsx");
// let excelObj = xlsx.parse("/Users/like/Downloads/前十币种统计.xlsx");

console.log(excelObj[0].data);


