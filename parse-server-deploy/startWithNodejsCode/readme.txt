1.配置
一般情况下只需要配置 config.json中的"uid"和 "domain"。
如果服务器上需要部署多个server(App)，则需要为每个server指定不同的端口
如果需要为dashboard指定与server不同的端口，可以通过"independentDashboardPort"设置独立的dashboard端口
多个server的dashboad可以用相同的端口，这里可以在一个dashboard页面中管理多个server
默认dashboard管理员账号和密码分别为 admin , aaa123HHH***


2.启动
pm2 start index.json

3.结束
pm2 stop index.json

4.本地调试请使用Visual Studio Code工具执行index.js文件
