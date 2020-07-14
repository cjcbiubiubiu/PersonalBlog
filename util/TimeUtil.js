// 设置时间
// var moment = require("moment");

function getNow() {
    // var currentTime = moment(parseInt(Date.now() / 1000)).format('YYYY-MM-DD HH:mm');
    // return currentTime;
    return parseInt(Date.now() / 1000);
}

module.exports.getNow = getNow;