//此方法除了是启动parse的方一种方法外还有以下特点
//1. 使用express把parse做为中间件启动 (所以这里要安装express)
//2. parse-server和parse-dashboard共用一个端口（如果想分开端口，可以创建两个ecpress实例）


// console.log(process.execPath)
// console.log(__dirname)
// console.log(process.cwd())

const fs = require("fs");
const express = require('express');
const ParseServer = require('/usr/local/lib/node_modules/parse-server').ParseServer;
const ParseDashboard = require('/usr/local/lib/node_modules/parse-dashboard');

//"serverURL":"http://localhost:1337/parse",
//"databaseURI":"mongodb://localhost/test_2",
var configData = fs.readFileSync(__dirname+"/config.json");
var config = JSON.parse(configData);

if( config.appId == null ){
    console.log( "config.appId can't be null");
    return;
}
if( config.masterKey == null ){
    console.log( "config.masterKey can't be null");
    return;
}
if( config.domain == null ){
    console.log( "config.domain can't be null");
    return;
}
if( config.port == 0 ){
    console.log( "config.appId can't be 0");
    return;
}

if( config.databaseURI == null ){
    config.databaseURI = "mongodb://localhost/"+config.appId;
}

if( config.serverURL == null ){
    config.serverURL = config.domain+":"+config.port+"/parse";
}

if( config.appName == null ){
    config.appName = config.appId;
}

if( config.cloud == null ){
    config.cloud = __dirname+"/cloud/main.js";
}

//__dirname+"/cloud/main.js"



var api = new ParseServer(config);

var options = { allowInsecureHTTP: false };

var dashboard = new ParseDashboard(config, options);

var app = express();

// make the Parse Server available at /parse
app.use('/parse', api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(config.port);


    // "users": [
    //     {
    //       "user":"admin",
    //       "pass":"aaa111HHH***"
    //     }
    //   ]