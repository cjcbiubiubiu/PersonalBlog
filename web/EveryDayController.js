let everyDayDao = require('../dao/EveryDayDao');
let timeUtil = require('../util/TimeUtil');
let respUtil = require('../util/RespUtil');
let path = new Map();

editEveryDay = (req, res) => {
    req.on("data", data => {
        // console.log(data.toString().trim());
        everyDayDao.insertEveryDay(data.toString().trim(), timeUtil.getNow(), result => {
            res.writeHead(200);
            res.write(respUtil.writeResult("success", "添加成功", null));
            res.end();
        })
    });
};

path.set("/editEveryDay", editEveryDay);

queryEveryDay = (req, res) => {
    everyDayDao.queryEveryDay((result) => {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })
};

path.set("/queryEveryDay", queryEveryDay);

module.exports.path = path;
