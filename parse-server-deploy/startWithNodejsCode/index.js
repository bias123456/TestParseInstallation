//此方法除了是启动parse的方一种方法外还有以下特点
//1. 使用express把parse做为中间件启动 (所以这里要安装express)
//2. parse-server和parse-dashboard共用一个端口（如果想分开端口，可以创建两个ecpress实例）


// console.log(process.execPath)
// console.log(__dirname)
// console.log(process.cwd())


// var object_a = {"a0":1,"a1":"hello"};
// var object_b = object_a;
// console.log(object_a);
// console.log(object_b);
// console.log("part1 test finished");
// object_b.a0 = 20;
// console.log(object_a);
// console.log(object_b);
// console.log("part2 test finished");




const GMConfigHelper = require("./GMConfigHelper");
const path = require('path');
const express = require('express');
const ParseServer = require('/usr/local/lib/node_modules/parse-server').ParseServer;
const ParseDashboard = require('/usr/local/lib/node_modules/parse-dashboard');





var configHelper = new GMConfigHelper();
var config = configHelper.makeParseConfigs(__dirname+"/config.json");
var server_config = config.server_config;
var dashboard_config = config.dashboard_config;
console.log("server_config"+server_config);
console.log("dashboard_config"+dashboard_config);


var api = new ParseServer(server_config);

var options = { allowInsecureHTTP: false };

var dashboard = new ParseDashboard(dashboard_config, options);

var server_app = express();


// Serve static assets from the /public folder
server_app.use('/public', express.static(path.join(__dirname, '/public')));

// Parse Server plays nicely with the rest of your web routes
// server_app.get('/', function(req, res) {
//     res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
//   });

  
  
// There will be a test page available on the /test path of your server url
// Remove this before launching your server_app
server_app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/test.html'));
});

// make the Parse Server available at /parse
server_app.use('/parse', api);

//如果server和dashboard共用一个端口，则把dashboard的入口点放到server的app里
if( dashboard_config.port == server_config.port )
{
    // make the Parse Dashboard available at /dashboard
    server_app.use('/dashboard', dashboard);
    //这里为了方便进入dashboard，所以改为"/"路径就可以直接进入dashboard
    server_app.use('/', dashboard);
}


var server_httpServer = require('http').createServer(server_app);
server_httpServer.listen(server_config.port,function(){
    console.log('server running on port ' + server_config.port + '.');

    if( dashboard_config.port == server_config.port ){
        //如果server和dashboard共用一个端口,则在这里也打印dashboard的端口信息
        console.log('dashboard running on port ' + dashboard_config.port + '.');
    }
});

if( dashboard_config.port != server_config.port )
{
    var dashboard_app = express();
    // make the Parse Dashboard available at /dashboard
    dashboard_app.use('/dashboard', dashboard);
    //这里为了方便进入dashboard，所以改为"/"路径就可以直接进入dashboard
    dashboard_app.use('/', dashboard);

    var dashboard_httpServer = require('http').createServer(dashboard_app);
    dashboard_httpServer.listen(dashboard_config.port,function(){
        //因为server和dashboard不是共用一个端口，所以这里重新打印dashboard的端口信息
        console.log('dashboard running on port ' + dashboard_config.port + '.');
    });


}



