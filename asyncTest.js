var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var async = require("async");


var q = async.queue(function(task, callback) {
    console.log('hello ' + task.name);
    console.log(task);
    callback("test");
}, 4);

q.push({name:'1'},function(err){
    console.log(err);
})
q.push({name:'2'},function(err){
    console.log(err);
})
q.push({name:'3'},function(err){
    console.log(err);
})
q.push({name:'4'},function(err){
    console.log(err);
})
q.push({name:'5'},function(err){
    console.log(err);
})
