// 设置时间
var moment = require("moment");

// 数据库原本是 INT(11)
function getChar() {
    var currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    return currentTime;
}

module.exports.getChar = getChar;