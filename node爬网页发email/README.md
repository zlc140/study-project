## nodejs 爬网页数据，定时发送email,email内容是网页

- superagent = require('superagent'); // 获取指定网页的DOM
- cheerio = require('cheerio'); // 能想jQuery一样获取DOM节点
- nodemailer = require('nodemailer'); // 发送邮件的node插件
- ejs = require('ejs'); //ejs引擎模板
- fs = require('fs'); //文件读写
- path = require('path'); //路径配置
- schedule = require('node-schedule'); //定时器任务库

[定时发邮件](https://juejin.im/post/5c75fa4af265da2d84109219#heading-5)
[定时发微信](https://github.com/gengchen528/wechatBot)