1. （适用于开发）通过全局安装工具supervisor(node热部署工具)，可以监控本更目录下所有文件，这样修改node代码之后不需重启
    使用： num install -g supervisor
          supervisor index.js (启动要在根目录 ，例如 supervisor bin/index.js)
          supervisor -i ./tool.md,./node_modules index.js  (忽略文件 空格 + 启动文件)
          直接运行supervisor可以得道它的详细使用方法
2. PM2 nodejs进程管理 --对于vue这种项目效果不好，无法看到项目报错，热加载缓慢
    可以通过pm2启动项目，一个cmd窗口运行多个项目
    全局安装 PM2：npm i pm2 -g
    监听应用：pm2 start index.js
    查看所有进程：pm2 list
    查看某个进程：pm2 describe App name/id
    停止某个进程：pm2 stop App name/id。
    停止所有进程：pm2 stop all
    重启某个进程：pm2 restart App name/id
    删除某个进程：pm2 delete App name/id
