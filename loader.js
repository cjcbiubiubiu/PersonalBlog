const fs = require("fs");
const globalConfig = require("./config");
// {
//     port: "3000",
//     web_path: "web"
// }

// let controllerSet = [];
let pathMap = new Map();

// readdirSync方法将返回一个包含“指定目录下所有文件名称”的数组对象。
let files = fs.readdirSync(globalConfig["web_path"]); 

for (let i = 0; i < files.length;  i++) {
    // 把每个path.set都导出去之后 temp里就是他们的一个集合
    // 如 {
        // path: Map {
        //     '/editEveryDay' => [Function: editEveryDay],
        //     '/queryEveryDay' => [Function: queryEveryDay]
        //      }
        // }
    let temp = require("./" + globalConfig["web_path"] + "/" + files[i]); // ./web/files[i]
    if (temp.path) {
        for (let [key, value] of temp.path) { // 循环遍历temp.path
            if (pathMap.get(key) == null) { // 如果没有这个key，则建立它。。
                pathMap.set(key, value);
                // console.log(pathMap);// { '/queryHotBlog' => [Function: queryHotBlog] }等等所有path.set的访问路径和方法
            } else {
                throw new Error("url path异常, url:" + key);
            }
        }
        // controllerSet.push(temp);
    }
}

module.exports = pathMap;
