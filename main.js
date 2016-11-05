var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs") ;
var rootUrl = 'http://www.sequ6.com';
var fetchedPage = new Array();//一个用来存已抓取的页面
var fetchedList = new Array();//一个用来存已经抓取的页面列表




function fetchList(url) {
    //首先 解析列表
    if(fetchedList.indexOf(url) > -1) {
        return ;
    }
    console.log(url);
    fetchedList.push(url);
    request({url:url,gzip:true,encoding:"utf8"}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
           // console.log("-----成功拿到了html------");
            var $ = cheerio.load(body);
            // 这里要解析列表 URL 并且打开页面
            $("tr[bgcolor='#F5FAFE']").find("td").find("a").each(function () {
                var shortLink = $(this).attr("href") ;
                if(shortLink.lastIndexOf("/") == shortLink.length-1) { //以/结尾d
                    var link = rootUrl + ($(this).attr("href").indexOf("/") > -1 ? "" : "/") + $(this).attr("href");//这里是小电影详细地址
                    fetchPage(link);
                }
            })


            $(".pages").find("a").each(function(){
                var link = rootUrl+($(this).attr("href").indexOf("/") > -1?"":"/")+$(this).attr("href");
                fetchList(link);
            })
        }
    });

}


function  fetchPage(pageUrl) {
    request({url:pageUrl,gzip:true,encoding:"utf8"}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //  console.log("-----成功拿到了html------");
            var $ = cheerio.load(body) ;

            $("tr").find("td[align='left']").children("img").each(function(){
                 var link = $(this).attr("src");
                 var filename = $(this).attr("alt")+link.substr(link.lastIndexOf("."));
                 download(link,filename);
            })
        }
    })
}

//写入文件

function download(file,filename){
    console.log(file);


    request({uri: file, encoding: 'binary'}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFile('images/'+filename, body, 'binary', function (err) {
                if (err) {console.log(err);}
            });
        }
    });

    /*try{ //总报错原因未知
        request.get(file).on('response', function(response) {
            // if(response.statusCode==404){
            //         throw new Error(file+'：资源不存在')
            // }
            console.log(response.statusCode) // 200
            console.log(response.headers['content-type']) // 'image/png'
        }).on('error', function(err) {
                console.log(err)
        }).pipe(fs.createWriteStream('images/'+filename,{mode: 0666}))

    }catch(e){
            console.log(e)
    }*/
    // request(file).pipe(fs.createWriteStream('images/'+filename)).on('close', function(){
    //     console.log("download sucess");
    // });  //调用request的管道来下载到 images文件夹下

}

fetchList(rootUrl);

/*request({url:rootUrl,gzip:true,encoding:"utf8"}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("-----成功拿到了html------");
        var $ = cheerio.load(body) ;
        $("tr[bgcolor='#F5FAFE']").each(function () {
           $(this).children("td").each(function(){
               $(this).find("a").each(function(){
                   console.log($(this).html()+"----"+$(this).attr("href")) ;
               })
           })
        }))

    }
})*/