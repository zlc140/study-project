var StartUp = /** @class */ (function () {
    function StartUp() {
    }
    StartUp.main = function () {
        console.log('hello world2');
        return 0;
    };
    return StartUp;
}());
console.log(StartUp.main());
//元组类型不符合就会报错（有组织的数组，定义是每个位置要对应的数据类型）
var tuple;
// tuple = ['123', 12, '123']
    
