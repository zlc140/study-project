
## 中间件

### cookie-parser 处理cookie的中间件

```js
// 使用
var express      = require('express')
var cookieParser = require('cookie-parser')
var util         = require('util');
 
var app = express()

// app.use(cookieParser())
app.use(cookieParser('123456')) //可以传入签名123456进行加密


app.get('/',function(req, res){
    console.log(req.cookies)
})
```
