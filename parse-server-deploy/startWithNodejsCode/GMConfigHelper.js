
const fs = require("fs");


module.exports = GMConfigHelper;

function GMConfigHelper (){

    GMConfigHelper.prototype.makeParseConfigs = function( settingPath ){
        var configData = fs.readFileSync(settingPath);
        var config = JSON.parse(configData);

        if( config.uid == null ){
            console.log( "config.uid can't be null");
            return null;
        }

        console.log(config.uid instanceof Object );//false
        console.log( typeof config.uid == "string" );//true

        if( typeof config.uid != "string" ){
            console.log( "config.uid must be [String] type");
            return null;
        }

        if( config.uid.length == 0 ){
            console.log( "the length of config.uid must be larger than 0.");
            return null;
        }


        if( config.appId == null ){
            config.appId = "appId_" + config.uid;
            console.log( "config.appId is null, we will use \"appId\" [" + config.uid + "] to replace." );
        }

        if( config.masterKey == null ){
            config.masterKey = "masterKey_" + config.uid;
        }

        if( config.domain == null ){
            config.domain = "http://localhost";
        }

        if( config.port <= 0 ){
            config.port = 1337;
        }

        if( config.databaseURI == null ){
            config.databaseURI = "mongodb://localhost/"+config.uid;
        }

        if( config.serverURL == null ){
            config.serverURL = config.domain+":"+config.port+"/parse";
        }

        if( config.appName == null ){
            config.appName = config.uid;
        }

        if( config.cloud == null ){
            config.cloud = __dirname + "/cloud/main.js";
        }


        var server_config = {};
        for( var key in config ){
            server_config[key] = config[key];
        }
        // "appId": "AppId_startWithJson",
        // "masterKey": "MasterKey_startWithJson",
        // "serverURL": "http://localhost:1337/parse",      
        // "port": 4040

        var dashboard_config = {};//控制面板的配置
        var currentAppDashboard = {};//当前server(app)控制面板的配置
        for( var key in config ){
            currentAppDashboard[key] = config[key];
        }

        //如果控制面板指定了另外一个独立的端口，则当前server(app)控制面板配置为该端口
        if( currentAppDashboard.independentDashboardPort > 0 ){
            currentAppDashboard.port =  currentAppDashboard.independentDashboardPort;
        }
        dashboard_config.apps = [currentAppDashboard];
        dashboard_config.port = currentAppDashboard.port;


        // "user":"admin",
        // "pass":"aaa123HHH***"
        if( config.users instanceof Array == false || config.users.length == 0 ){
            var aUser = {"user":"admin","pass":"aaa123HHH***"};
            dashboard_config.users = [aUser];
        }else{
            dashboard_config.users = config.users;
        }


        return {"server_config":server_config,"dashboard_config":dashboard_config};

    }
}