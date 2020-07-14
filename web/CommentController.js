let commentDao = require('../dao/CommentDao');
let blogDao = require('../dao/BlogDao');
let tagsDao = require('../dao/TagsDao');
let tagBlogMappingDao = require('../dao/TagBlogMappingDao');
let timeUtil = require('../util/TimeUtil');
let respUtil = require('../util/RespUtil');
let url = require('url');
let captcha = require("svg-captcha");

let path = new Map();

queryNewComments = (req, res) => {
    commentDao.queryNewComments(5, result => {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}

path.set("/queryNewComments", queryNewComments);

addComment = (req, res)=> {
    let params = url.parse(req.url, true).query;
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), result => {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "评论成功", result));
        res.end();
    })
}

path.set("/addComment", addComment);

queryRandomCode = (req, res) => {
    let img = captcha.create({fontSize: 50, width:100, height: 34});
    res.writeHead(200);
    res.write(respUtil.writeResult("success", "评论成功", img));
    res.end();
}
path.set("/queryRandomCode", queryRandomCode);

queryCommentsByBlogId = (req, res) => {
    let params = url.parse(req.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), result => {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "评论成功", result));
        res.end();
    })
}

path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

queryCommentsCountByBlogId = (req, res) => {
    let params = url.parse(req.url, true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid), result => {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "评论成功", result));
        res.end();
    })
}

path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

module.exports.path = path;
