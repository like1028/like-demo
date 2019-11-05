/**
 *@fileName execl.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/7/17
 *@disc     nodejs 读取 exexl 文件内容
 */

const fs = require('fs');

//基于Node.js解析excel文件数据及生成excel文件，仅支持xlsx格式文件；
const xlsx = require('node-xlsx');

const readLine = require('readline');


// let excelObj = xlsx.parse("/Users/like/Downloads/node-xlsx.xlsx");
// let excelObj = xlsx.parse("/Users/like/Downloads/前十币种统计.xlsx");

// console.log(excelObj[0].data);


let f = fs.readFileSync('/Users/like/Desktop/newlist.txt', 'utf-8');
console.log(f);

let arr = [];

let readObj = readLine.createInterface({input: fs.createReadStream('/Users/like/Desktop/newlist.txt')});

readObj.on('line', function (line) {
    arr.push(line);
});

readObj.on('close', function () {
    console.log('read line close');
    // console.log(arr);
    // console.log(arr[0].split(','));

    let data = [{
        name :'sheet1',
        data: [
            [
                '标题',
                '作者',
                '单位',
                '时间'
            ]
        ]
    }];
    for (let v of arr) {
        data[0].data.push(v.split(','))
    }
    // console.log(data[0].data);
    let dataBuffer = xlsx.build(data);
    fs.writeFileSync('/Users/like/Desktop/newlist.xlsx', dataBuffer)
});