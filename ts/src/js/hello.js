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
//枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var colorName = Color[2];
console.log(colorName, c);
function say(name) {
    console.log(name);
    // return 0
}
say('枚举');
var error = function (message) {
    throw new Error(message);
};
var showError = function () { return error('never is not get it'); };
showError();
