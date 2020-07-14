let dbutil = require('./DBUtil');

insertEveryDay = (content, ctime, success) => {
    let insertSql = "insert into every_day(`content`, `ctime`) values (?, ?)";
    let params = [content, ctime];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, (error, result) => {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
};

queryEveryDay = (success) => {
    let querySql = "select * from every_day order by id desc limit 1;"; // limit限制查询条数
    let params = [];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, (error, result) => {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
};

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;

