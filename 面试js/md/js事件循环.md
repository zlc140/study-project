#### js事件循环
https://juejin.im/post/5aacd1766fb9a028cb2d6766
js执行为单线程，所有代码皆在主线程调用栈完成执行。当主线程任务清空后才会去轮询取任务队列中任务。

1.同步和异步
    同步：是指调用函数可以立刻得到结果 (调用后必须执行完才会继续下个任务)
    异步：调用函数后需要通过一定手段在将来得到结果setTimeout,promise，ajax,dom事件 (调用后不需等待结果继续下个任务)
    
2.任务队列
    同步任务： 排队执行
    异步任务：不在主线程，而进入任务队列，等待队列通知到主线程可以执行了才会执行
    
3.执行顺序
    a:同步任务在主线程执行，形成一个执行栈
    b:但主线程为空时，检查任务队列是否为空，为空继续检查，不为空则继续c
    c:去任务队列首位，压入执行栈
    d:执行新任务
    e:检查执行栈，为空则跳到b;不可则继续执行
    
    
4.Event Loop (入栈出栈的循环)
    不同的异步函数执行放入不同的任务中 === 宏任务(macro-task)  微任务(micro-task)
   
   macro-task包括： setTimeout,setInterval,setImmediate,I/O,UI redndering
   micro-task包括： process.nextTick,Promise,Object.observe,MutationObserver
   
   a: 执行完主线程任务
   b: 取微任务执行到清空
   c: 取一个宏任务执行
   d: 取微任务执行到清空
   e: 重复c->d
 
  
5.注意：
>   其实promise的then和catch才是microtask，本身的内部代码不是。
    script标签的内容会被当成一个独立的task,即会执行完前面的microtask,才会继续执行下个script
    a:浏览器和node中执行不一样
    b:任务队列是先入先出
    
```$xslt
    console.log('global') 
    for (var i = 1;i <= 5;i++) {
      setTimeout(function() {
        console.log(i)
      },i*1000)
      console.log(i)
    }
    
    new Promise(function (resolve) {
      console.log('promise1')
      resolve()
     }).then(function () {
      console.log('then1')
    })
    
    setTimeout(function () {
      console.log('timeout2')
      new Promise(function (resolve) {
        console.log('timeout2_promise')
        resolve()
      }).then(function () {
        console.log('timeout2_then')
      })
    }, 1000)
     
```
结果: global - 1-2-3-4-5 - promise1 - then1 - 6 - timeout2 - timeout2_promise - timeout2_then - 6()

#### node事件循环 https://juejin.im/post/5aa5dcabf265da239c7afe1e

1.在node中事件每一轮循环按照顺序分为6个阶段，来自libuv的实现：

    1.timers：执行满足条件的setTimeout、setInterval回调。
    2.I/O callbacks：是否有已完成的I/O操作的回调函数，来自上一轮的poll残留。
    3.idle，prepare：可忽略
    4.poll：等待还没完成的I/O事件，会因timers和超时时间等结束等待。
    5.check：执行setImmediate的回调。
    6.close callbacks：关闭所有的closing handles，一些onclose事件。


 