// 获取配置文件的内容
// 文件 server.conf 里的内容如下
// port = 3000
// web_path = web
const fs = require("fs");

let globalConfig = {};

let conf = fs.readFileSync("./server.conf"); // 读取到的是一堆二进制内容
// \n 换行 \r回车
// split() 方法用于把一个字符串分割成字符串数组。
let configArr = conf.toString().split("\n"); // 得到的是 [ 'port = 3000\r', 'web_path = web' ]

for (let i = 0; i < configArr.length; i++) {
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();
    // 转成对象
    // [
    //     "port = 3000",
    //     "web_path = web"
    // ]

    // {
    //     port: "3000",
    //     web_path: "web"
    // }
}
// console.log(globalConfig); // { port: '3000', web_path: 'web' }
module.exports = globalConfig;