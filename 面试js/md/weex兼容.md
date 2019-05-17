# WEEX兼容性文档

### 1.padding
```
不支持padding: 20px 40px;   
支持：  
padding-top: 20px;  
padding-bottom: 20px;  
padding-left: 40px;  
padding-right: 40px;  
支持padding: 10px;  
```

### 2. flex
```
.parent { flex-direction: row; }  
.child { flex: 1 } 

自动换行（如九宫格）
flex-direction: row;
/*换行*/
flex-wrap:wrap;

``` 

### 3. font-size
```
<text> iOS默认值：32，Android：不同设备不同，H5 默认值：32.
12px:28px  
14px:32px  
16px:36px  
18px:40px  
20px:44px  
25px:54px  
30px:64px  
```


### 4. border style
```
border-width: 1px;  
border-style: solid;  
border-color:  #f1f2f3;  
不支持简写：  
border: 1px solid #f1f2f3;  
```

### 5. 没有 !important，没有.parent .child 和 .parent > .child优先级写法

### 6. :class支持
```
1. [item.type !== '0' ? 'text-green' : 'some-class']；  
2. ['name1', 'name2']；    
3. [item.type !== '0' ? 'text-green' : '']  当class=''时在真机上有bug，不能设置空；    
4. [hasStyle ? 'style-1' : 'style-2']在data中声明变量hasStyle，在playground和preview中不正常，在APP中正常。

```

### 7. <list>只支持[]，不支持遍历对象：{1:[],2:[]}
数据加载完毕会自动不再调用接口，无需自己处理

### 8.text文件内容添加回车会渲染出问题,text有回车还会导致要居中的时候会不居中


### 9.图片
```
使用<image></image>标签代替<img>
不支持svg格式  
<image>设置padding无效，设置margin有效
```

### 10. 获取屏幕高度
```
const width = weex.config.env.deviceWidth;
const height = weex.config.env.deviceHeight;
this.deviceHeight = 750/width * height;

```

### 11. 返回页面不会触发页面刷新或者执行任何function
该怎么处理呢？目前使用BroadcastChannel通知有点儿繁琐，且所有需要新信息的页面都需要监听以及都会被通知执行相应代码

### 12. 页面中引用component，在该页面中无法覆盖component中的样式


### 13. list cell标签中设置margin-top失效
```
可以利用以下思路解决没个cell中间margin-top：20px：
list: margin-top：20px; background-color: #f9f9f9;
cell: padding-bottom: 20px; background-color: #f9f9f9;
cell-top: padding-top: 20px; 设置border-top; background-color: #fff;
cell-bottom: padding-bottom: 20px; 设置border-bottom; background-color: #fff;
```

### 14. Android上处理圆角，必须在外层div中设置border-radius

### 15. 代码里调用BroadcastChannel会导致playground扫描weex-preview二维码无法预览，但是使用debug模式可以正常渲染

