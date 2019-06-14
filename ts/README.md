### 编译方式
1. 安装  npm install -g typescript

2. 指定比那一的文件  tsc hello.ts

3. 通过tsconfig.json 编译  直接 tsc (这里可以有更多的设置)

4

### 基本类型和扩展类型

1. 除啦和js共享的数据类型之外还有额外类型
    - 元组 <em>tuple<em>
    - 枚举 enum
    - Any 与 Void 
    
```js
// 数字，二、八、十六进制都支持
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;

// 字符串，单双引都行
let name: string = "bob";
let sentence: string = `Hello, my name is ${ name }`

// 数组，第二种方式是使用数组泛型，Array<元素类型>：
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];

let u: undefined = undefined;
let n: null = null;

// 特殊类型
//元组 
let tuple: [number, string, string]
tuple = ['123', 12, '123']

// 枚举 enum类型是对JavaScript标准数据类型的一个补充


//  ts中定义的函数必须有返回值，否则会报错,可以将放回值类型定位void


function say(name: string): void{
    console.log(name)
}
say('')

// 当无法确定类型时用Any，但要慎用，用多了就失去ts 的意义了
let person: any = "前端劝退师"
person = 25
person = true

```
2. 类型断言 <类型>值 或 值 as 类型
有的时候需要获取某个数据上的属性或者方法，但不确定数据类型

```js
function getLength(something: string | number): number {
    if((<string>something).length) { //直接使用 something.length 报错，使用断言
        return (<string>something).length
    }else {
        return something.toString().length
    }
}
```
    
#### 安全导航操作符（?.） 非空断言操作符（!.）

- ?. (为了解决导航变量值为null，页面运行出错)

this.page name is {{ nullHero?.name }}

- !. 与安全导航操作符不同的是，非空断言操作符不会防止出现 null 或 undefined。
let s = e!.name;  // 断言e是非空并访问name属性
