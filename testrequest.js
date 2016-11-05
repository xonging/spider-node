var request = require('request');
var cheerio = require('cheerio');
var rootUrl = "http://www.yangkui.net/test";


// request({url:rootUrl,gzip:true,encoding:"utf8"}, function (error, response, body) {
//     console.log(response.statusCode);
//     if (!error && response.statusCode == 200) {
//         console.log("-----成功拿到了html------");
//         console.log(body);
//         // var $ = cheerio.load(body) ;
//     }
// })


//404
// request({url:"https://yangkui.net/test",gzip:true,encoding:"utf8"}, function (error, response, body) {
//     console.log(response.statusCode);//404
//     console.log(error); //null
//     console.log(body); //404页面
// })


//断线
request({url:"https://yangkui.net/test",gzip:true,encoding:"utf8"}, function (error, response, body) {
    // console.log(response.statusCode);//404
    console.log(error); //
     // {      [Error: getaddrinfo EAI_AGAIN yangkui.net:443]
     //        code: 'EAI_AGAIN',
     //        errno: 'EAI_AGAIN',
     //        syscall: 'getaddrinfo',
     //        hostname: 'yangkui.net',
     //        host: 'yangkui.net',
     //        port: 443
     // }
    console.log(body); //undefined
    console.log(response);//undefined

})