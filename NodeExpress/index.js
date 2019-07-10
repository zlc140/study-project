const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser')

const app = express()
const router = express.Router();

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

//options
var options = {
    domain: '', //设置子域名（二级域名）是否可以访问cookie
    expires: '', //过期时间（秒）
    maxAge: '', // 最大失效时间（毫秒），设置在多少后失效
    secure: '', // 当 secure 值为 true 时， cookie 在 HTTP 中是无效，在 HTTPS 中才有效
    path: '', //表示 cookie 影响到的路由，如 path=/。如果路径不能匹配时，浏览器则不发送这个 Cookie
    httpOnly: '', //默认为false,建议设置为true, 客户端将无法通过document.cookie读取到 COOKIE 信息，可防止 XSS 攻击产生
    signed: '' // 表示是否签名（加密） cookie, 设为 true 会对这个 cookie 签名，这样就需要用res.signedCookies 访问它,前提需要设置上面中间件app.use传参 。未签名则用 res.cookies 访问
}

//设置允许跨域
var allCrossDomain = function(req, res, next) {

    //设置允许跨域的域名
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');

    next();
}
app.use(cookieParser('123456'))
app.use(allCrossDomain)

app.set('views', path.join(__dirname, 'views'))// 设置存放模板文件的目录 (这个目录不能设置为view,报错View is not constructor)
app.set('view engine', 'ejs')// 设置模板引擎为 ejs

app.use( express.static(path.join(__dirname , 'static'))) //设置静态文件路径
console.log(path.join(__dirname , 'static'))

app.use('/',indexRouter)
app.use('/user',userRouter) //设置路由
// app.use(userRouter)
//JSONP请求
app.get('/show',(req, res)=> {
    console.log(req.query)
    let {callback} = req.query
    res.send(`${callback}('hello')`)
})

app.get('/views/comHeader.html', function(req,res){
    res.sendFile(__dirname + '/views/iframe/' + 'comHeader.html')
})
app.get('/views/comFooter.html', function(req,res){
    res.sendFile(__dirname + '/views/iframe/' + 'comFooter.html')
})
app.get('/views/exceFooter.html', function(req,res){
    res.sendFile(__dirname + '/views/iframe/' + 'exceFooter.html')
})

app.get('/login', function(req,res) {
    //cookie写入该域名
    let response = {
        status: '200',
        message: '用户名不正确'
    }
    if(!(req.signedCookies && req.signedCookies.token) && req.query && req.query.username == 'lulu') {
        res.cookie('token', "lulu", { maxAge: 100000*2,signed:true});
        response.message = '登录成功'
    }

    res.send(JSON.stringify(response))
})
app.get('/lagout', function(req,res) {
    console.log('Cookie2', req.cookies, req.signedCookies)
    //cookie写入该域名
    res.cookie('token', "lulu", { maxAge: 0});
    let response = {
        status: '200',
        message: '退出成功了'
    }
    res.send(JSON.stringify(response))
})

//get表单请求
app.get('/form_get', function(req, res) {
    console.log('Cookie', req.cookies, req.signedCookies)
    var response = {
        status: '200',
        message: '',
        data: null
    }
    if(req.signedCookies && req.signedCookies.token){
        response.status = '200';
        response.data = {
            "message": req.query.message
        }

    }else{
        response.status = '401';
        response.message = '用户未登录'
    }
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
    res.end(JSON.stringify(response))
})

app.get('/footer', function (req, res) {
    console.log('footer',res.cookies, req.signedCookies)
    let response = {
        status: '200',
        message: 'ok'
    }
    res.end(JSON.stringify(response))
})

var server = app.listen(3000,'127.0.0.1', function(){
    var host = server.address().address
    var port = server.address().port
    console.log("访问地址为 http://%s:%s", host, port )
})
