const path = require('path');
const express = require('express');
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

app.set('views', path.join(__dirname, 'views'))// 设置存放模板文件的目录 (这个目录不能设置为view,报错View is not constructor)
app.set('view engine', 'ejs')// 设置模板引擎为 ejs

app.use('/',indexRouter)
app.use('/user',userRouter)
// app.use(userRouter)

app.listen(3000,'127.0.0.1')