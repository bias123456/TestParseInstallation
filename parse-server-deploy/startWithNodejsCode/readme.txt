1. 安装

2.配置
一般情况下只需要配置 config.json中的"uid"和 "domain"。"uid"是不带空格的字符串，"domain"是服务器的域名地址（不带端口号）如：http://gemo.com, http://234:124:15:68
如果服务器上需要部署多个server(App)，则需要为每个server指定不同的端口
如果需要为dashboard指定与server不同的端口，可以通过"independentDashboardPort"设置独立的dashboard端口
多个server的dashboad可以用相同的端口，这里可以在一个dashboard页面中管理多个server
默认dashboard管理员账号和密码分别为 admin , aaa123HHH***


3.启动
pm2 start index.js

4.结束
pm2 stop index.js

5.本地调试请使用Visual Studio Code工具执行index.js文件

6.服务器端调试，请使用下面的命令，这样可以查看到打印的log
node index.js



7.异常排查
1）如果出现提示云函数文档找不到的情况，请先检查云函数路径设置是否正常.
