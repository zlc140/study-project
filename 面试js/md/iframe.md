

### iframe和主框架互相访问

1. 同域名下（不跨域）直接通过window.parent访问主框架的方法等，window.myFrame（myFrame是对应子的id/name）访问子的方法等

2. 跨域访问 （例如localhost和127.0.0.1）
a.html, b.html  
a.html中引入b.html  

如何使用上面的方法会报错：
> Uncaught SecurityError: Blocked a frame with origin "http://localhost" from accessing a frame with origin "http://127.0.0.1". Protocols, domains, and ports must match.

方法：通过创建同域名下的iframe(例如a访问b的方法，则和b在同一个域名下创建exceB.html,在exceB的script中执行要调用的b的方法`parent.window.myframe.fIframe();`)

