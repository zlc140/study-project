class StartUp {
    public static main(): number {
        console.log('hello world2')
        return 0
    }
}
console.log(StartUp.main());

//元组类型不符合就会报错（有组织的数组，定义是每个位置要对应的数据类型）
let tuple: [number, string, string]
// tuple = ['123', 12, '123']

//枚举
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;

let colorName: string = Color[2]
console.log(colorName, c)

function say(name: string): void{
    console.log(name)
    // return 0
}
say('枚举')

// never 永远得不到 编译报错，具体怎么用还不知道
// const error = (message: string): never => {
//     throw new Error(message)
// }
//
// const showError = () => error('never is not get it')
//
// showError()


function getLength(something: string | number): number {
    if((<string>something).length) {
        return (<string>something).length
    }else {
        return something.toString().length
    }
}

console.log('类型断言', getLength(12))
