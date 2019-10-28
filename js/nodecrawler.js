/**
 *@file    nodecrawler.js
 *@author  Like (likeaixi@gmail.com)
 *@date    2019-10-25
 *@disc    node 爬虫
 */

const Crawler = require("crawler");
const fs = require('fs');
const Request = require('https').request;

var c = new Crawler({
    // maxConnections : 10,
    rateLimit: 1500,
    jQuery: true,
    headers: {
        Cookie: `ASP.NET_SessionId=13utbstezuzeisabz5xz2ylg; Ecp_ClientId=6191025145800870852; SID_kns=123109; SID_klogin=125142; KNS_SortType=; RsPerPage=20; SID_krsnew=125133; cnkiUserKey=f2d08f3e-2bf8-8847-8473-50c4dbebce20; SID_kvisual=125103; Ecp_IpLoginFail=191025112.10.38.150; _pk_ses=*`
    },
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            console.log('Grabbed', res.body.length, 'bytes');
            console.log('Url', res.options.uri);

            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            var tr = $(".GridTableContent").children('tr');
            if (tr.length > 0) {
                for (var i = 1; i < tr.length; i++) {
                    var td = $(tr[i]).children('td');
                    var list = [];
                    for (var j = 1; j < 5; j++) {
                        // console.log($(td[j]).text());
                        list.push($(td[j]).text().trim());
                        // console.log(list);
                    }
                    fs.appendFile("./list.txt", list + "\n", (err) => {
                    });
                }
            } else {
                var imgSrc = $("#CheckCodeImg").attr("src");  //  https://kns.cnki.net/kns/checkcode.aspx?t='0.134481467834898
                var url = `https://kns.cnki.net/kns/` + imgSrc.replace("/kns/", "");
                console.log(url);
                console.log(res.body);


                let stream = Request(url).pipe(fs.createWriteStream("./checkcode.jpg"));
                // console.log(req);
                stream.on('finish', () => {
                    console.log('图片写入完成');
                    return
                });
                // return
            }
        }
        done();
    }
});

// Queue a list of URLs
var urlList = [];
for (var i = 107; i < 1500; i++) {
    var url = 'https://kns.cnki.net/kns/brief/brief.aspx?curpage=' + i + '&RecordsPerPage=50&QueryID=5&ID=&turnpage=1&tpagemode=L&dbPrefix=SCDB&Fields=&DisplayMode=listmode&PageName=ASP.brief_result_aspx&isinEn=1&';
    urlList.push(url)
}
console.log(urlList);

c.queue(urlList);


// Queue some HTML code directly without grabbing (mostly for tests)
c.queue([{
    html: '<p>This is a <strong>test</strong></p>'
}]);




