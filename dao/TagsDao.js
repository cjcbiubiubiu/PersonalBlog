let dbutil = require('./DBUtil');

insertTag = (tag, ctime, utime, success) => {
    let insertSql = "insert into tags(`tag`, `ctime`, `utime`) values (?, ?, ?);";
    let params = [tag, ctime, utime];

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

queryTag = (tag, success) => {
    let querySql = "select * from tags where tag = ?;";
    let params = [tag];

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

queryAllTags = (success) => {
    let querySql = "select * from tags;";
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

module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTags = queryAllTags;
