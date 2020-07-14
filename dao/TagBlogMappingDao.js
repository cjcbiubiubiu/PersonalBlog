let dbutil = require('./DBUtil');

insertTagBlogMapping = (tagId, blogId, ctime, utime, success) => {
    let insertSql = "insert into tag_blog_mapping(`tag_id`, `blog_id`, `ctime`, `utime`) values (?, ?, ?, ?);";
    let params = [tagId, blogId, ctime, utime];

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

// queryByTag = (tagId, page, pageSize, success) => {
//     let querySql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;";
//     let params = [tagId, page * pageSize, pageSize];

//     let connection = dbutil.createConnection();
//     connection.connect();
//     connection.query(querySql, params, (error, result) => {
//         if (error == null) {
//             success(result);
//         } else {
//             console.log(error);
//         }
//     });
//     connection.end();
// };

// queryByTagCount = (tagId, success) => {
//     let querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
//     let params = [tagId];

//     let connection = dbutil.createConnection();
//     connection.connect();
//     connection.query(querySql, params, (error, result) => {
//         if (error == null) {
//             success(result);
//         } else {
//             console.log(error);
//         }
//     });
//     connection.end();
// };


module.exports.insertTagBlogMapping = insertTagBlogMapping;
// module.exports.queryByTag = queryByTag;
// module.exports.queryByTagCount = queryByTagCount;

